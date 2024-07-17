import { useEffect, useState } from "react";
import { FlexibleTable } from "../../../components/FlexibleTable/FlexibleTable";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { GetAllExitNotes, GetExitNoteById } from "../../../services/ExitNoteService";
import parseErrorMessage from "../../../utils/ParseErrorMessage";
import { Loading } from "../../../components/Loading/Loading";
import { ErrorAlert } from "../../../components/ErrorAlert/ErrorAlert";
import Pagination from "../../../components/Pagination/Pagination";
import { useOutletContext } from "react-router-dom";
import { IOutletContextType } from "../../../lib/interfaces/header/IOutletContextType";
import { IListExitNote } from "../../../lib/interfaces/exitNote/IListExitNote";

const orderOptions = ["Id", "Product Id", "Quantity"];

export function ExitNotesPage() {
	const [exitNotes, setExitNotes] = useState<IListExitNote[]>([]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [totalRecords, setTotalRecords] = useState<number>(0);
    const [skip, setSkip] = useState<number>(0);
    const [take] = useState<number>(8);
	const [orderOption, setOrderOption] = useState<string>('id');
	const [isAscending, setIsAscending] = useState<boolean>(false);
	const { setPagina, setActivatedTag } = useOutletContext<IOutletContextType>();

	useEffect(() => {
		setPagina("exitNotes")
		setActivatedTag("listExitNotes")
	})

	const onSearchChange = async (value: string) => { 
		if (value === "") {
			setSkip(0);
			fetchData();
		} else {
			const id = Number(value);
			if (!isNaN(id)) {
				try {
					const exitNote = await GetExitNoteById(id);
					setExitNotes(exitNote ? [exitNote] : []);
				} catch (error: any) {
					setExitNotes([]); 
				}
			}
		}
	};

	const fetchData = async () => {
		try {
			const pagedExitNotes = await GetAllExitNotes(skip, take, orderOption, isAscending);
			setExitNotes(pagedExitNotes.records);
			setTotalRecords(pagedExitNotes.totalRecords);
		} catch (error: any) {
			setErrorMessage(parseErrorMessage(error));
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [skip, take, orderOption, isAscending]);

	const handlePageChange = (newSkip: number) => {
        setSkip(newSkip);
    };

	const handleOrderSelect = (option: string) => {
		setOrderOption(option)
	}

	const handleDirectionSelect = (option: boolean) => {
		setIsAscending(option);
	}

	if (loading) return <Loading />;
	if (errorMessage) return <ErrorAlert errorMessage={errorMessage} />;

	return (
		<>
			
			<SearchBar onSearchChange={onSearchChange} orderOptions={orderOptions} onDirectionChange={handleDirectionSelect} onOptionChange={handleOrderSelect}/>

			<FlexibleTable
				bgColor="white"
				data={exitNotes}
				keysBlackList={["batches"]}
				size="lg"
				variant="striped"
				thColor="#F6F6F6"
				detailedListUrl="exit-note"
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
