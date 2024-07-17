import { useEffect, useState } from "react";
import { FlexibleTable } from "../../../components/FlexibleTable/FlexibleTable";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { IListEntryNote } from "../../../lib/interfaces/entryNote/IListEntryNote";
import { GetAllEntryNotes, GetEntryNoteById } from "../../../services/EntryNoteService";
import parseErrorMessage from "../../../utils/ParseErrorMessage";
import { Loading } from "../../../components/Loading/Loading";
import { ErrorAlert } from "../../../components/ErrorAlert/ErrorAlert";
import Pagination from "../../../components/Pagination/Pagination";
import { format } from "date-fns";
import { useOutletContext } from "react-router-dom";
import { IOutletContextType } from "../../../lib/interfaces/header/IOutletContextType";

const filterOptions = ["Id", "Note Generation Time", "Expiry Date", "Price"];

export function EntryNotesPage() {
	const [entryNotes, setEntryNotes] = useState<IListEntryNote[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [totalRecords, setTotalRecords] = useState<number>(0);
	const [skip, setSkip] = useState<number>(0);
	const [take] = useState<number>(8);
	const [orderOption, setOrderOption] = useState<string>("id");
	const [isAscending, setIsAscending] = useState<boolean>(false);
	const { setPagina, setActivatedTag } = useOutletContext<IOutletContextType>();

	useEffect(() => {
		setPagina("entryNotes")
		setActivatedTag("listEntryNotes")
	})

	const onSearchChange = async (value: string) => { 
		if (value === "") {
			setSkip(0);
			fetchEntryNotes();
		} else {
			const id = Number(value);
			if (!isNaN(id)) {
				try {
					const entryNote = await GetEntryNoteById(id);
					setEntryNotes(entryNote ? [entryNote] : []);
				} catch (error: any) {
					setEntryNotes([]); 
				}
			}
		}
	};

	const fetchEntryNotes = async () => {
		try {
			const pagedEntryNotes = await GetAllEntryNotes(skip, take, orderOption, isAscending);
			const formattedData = pagedEntryNotes.records.map((item) => ({
				...item,
				formattedExpiryDate: item.expiryDate
					? format(new Date(item.expiryDate), "dd/MM/yyyy HH:mm:ss")
					: "N/A",
				formattedNoteGenerationTime: format(
					new Date(item.noteGenerationTime),
					"dd/MM/yyyy HH:mm:ss"
				),
			}));
			setEntryNotes(formattedData);
			setTotalRecords(pagedEntryNotes.totalRecords);
		} catch (error: any) {
			setErrorMessage(parseErrorMessage(error.message));
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchEntryNotes();
	}, [skip, take, orderOption, isAscending]);

	const handlePageChange = (newSkip: number) => {
		setSkip(newSkip);
	};

	const handleOrderSelect = (option: string) => {
		setOrderOption(option);
	};

	const handleDirectionSelect = (option: boolean) => {
		setIsAscending(option);
	};

	if (loading) return <Loading />;
	if (errorMessage) return <ErrorAlert errorMessage={errorMessage} />;

	return (
		<>
			
			<SearchBar
				onSearchChange={onSearchChange}
				orderOptions={filterOptions}
				onDirectionChange={handleDirectionSelect}
				onOptionChange={handleOrderSelect}
			/>

			<FlexibleTable
				bgColor="white"
				data={entryNotes}
				keysBlackList={["noteGenerationTime", "expiryDate"]}
				size="lg"
				variant="striped"
				thColor="#F6F6F6"
			/>
			<Pagination
				totalRecords={totalRecords}
				pageSize={take}
				onPageChange={handlePageChange}
				currentSkip={skip}
			/>
		</>
	);
}
