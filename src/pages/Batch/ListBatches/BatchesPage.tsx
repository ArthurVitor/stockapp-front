import { useEffect, useState } from "react";
import { FlexibleTable } from "../../../components/FlexibleTable/FlexibleTable";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import IListBatch from "../../../lib/interfaces/batch/IListBatch";
import { getAllAvaliableBatches, getAvaliableBatchById } from "../../../services/BatchService";
import { Loading } from "../../../components/Loading/Loading";
import { ErrorAlert } from "../../../components/ErrorAlert/ErrorAlert";
import { format } from "date-fns";
import parseErrorMessage from "../../../utils/ParseErrorMessage";
import Pagination from "../../../components/Pagination/Pagination";
import { useOutletContext } from "react-router-dom";
import { IOutletContextType } from "../../../lib/interfaces/header/IOutletContextType";

const orderOptions = ["Id", "Price", "Quantity", "Total Value"];

export function BatchesPage() {
	const [batches, setBatches] = useState<IListBatch[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [totalRecords, setTotalRecords] = useState<number>(0);
	const [skip, setSkip] = useState<number>(0);
	const [take] = useState<number>(8);
	const [orderOption, setOrderOption] = useState<string>("id");
	const [isAscending, setIsAscending] = useState<boolean>(false);
	const { setPagina, setActivatedTag } = useOutletContext<IOutletContextType>();

	useEffect(() => {
		setPagina("batches")
		setActivatedTag("batches")
	})
	
	const onSearchChange = async (value: string) => {
		if (value === "") {
			setSkip(0);
			fetchBatches();
		} else {
			const id = Number(value);
			if (!isNaN(id)) {
				try {
					const batch = await getAvaliableBatchById(id);
					batch.formattedExpiryDate = batch.expiryDate
						? format(new Date(batch.expiryDate), "dd/MM/yyyy HH:mm:ss")
						: "N/A";
					setBatches(batch ? [batch] : []);
				} catch (error: any) {
					setBatches([]); 
				}
			}
		}
	};

	const fetchBatches = async () => {
		try {
			const data = await getAllAvaliableBatches(skip, take, orderOption, isAscending);
			const formattedData = data.records.map((item) => ({
				...item,
				formattedExpiryDate: item.expiryDate
					? format(new Date(item.expiryDate), "dd/MM/yyyy HH:mm:ss")
					: "N/A",
			}));
			setBatches(formattedData);
			setTotalRecords(data.totalRecords);
		} catch (error) {
			setErrorMessage(parseErrorMessage(error));
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBatches();
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
				searchMessage=""
				onSearchChange={onSearchChange}
				orderOptions={orderOptions}
				onDirectionChange={handleDirectionSelect}
				onOptionChange={handleOrderSelect}
			/>
			<FlexibleTable
				data={batches}
				keysBlackList={["expiryDate"]}
				size={"lg"}
				variant={"striped"}
				bgColor="white"
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
