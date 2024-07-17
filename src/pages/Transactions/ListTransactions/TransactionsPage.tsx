import { ErrorAlert } from "../../../components/ErrorAlert/ErrorAlert";
import { Loading } from "../../../components/Loading/Loading";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { FlexibleTable } from "../../../components/FlexibleTable/FlexibleTable";
import Pagination from "../../../components/Pagination/Pagination";
import { useListTransactions } from "../../../hooks/useListTransactions";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { IOutletContextType } from "../../../lib/interfaces/header/IOutletContextType";

const orderOptions = ["Id", "Quantity", "Inventory Id", "Note id"];

export function TransactionsPage() {
	const {
		transactions,
		loading,
		errorMessage,
		totalRecords,
		skip,
		take,
		onSearchChange,
		handlePageChange,
		handleOrderSelect,
		handleDirectionSelect,
	} = useListTransactions();
	const { setPagina, setActivatedTag } = useOutletContext<IOutletContextType>();

	useEffect(() => {
		setPagina("transactions");
		setActivatedTag("listTransactions");
	});

	if (loading) return <Loading />;
	if (errorMessage) return <ErrorAlert errorMessage={errorMessage} />;

	return (
		<>
			<SearchBar
				onSearchChange={onSearchChange}
				orderOptions={orderOptions}
				onDirectionChange={handleDirectionSelect}
				onOptionChange={handleOrderSelect}
			/>
			<FlexibleTable
				data={transactions}
				keysBlackList={["entryNoteDetails", "exitNoteDetails"]}
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
