import { Loading } from "../../../components/Loading/Loading";
import { ErrorAlert } from "../../../components/ErrorAlert/ErrorAlert";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { FlexibleTable } from "../../../components/FlexibleTable/FlexibleTable";
import Pagination from "../../../components/Pagination/Pagination";
import { useListOverride } from "../../../hooks/useListOverride";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { IOutletContextType } from "../../../lib/interfaces/header/IOutletContextType";

export default function OverridesPage() {
	const {
		overrides,
		loading,
		errorMessage,
		totalRecords,
		skip,
		take,
		orderOptions,
		onSearchChange,
		handlePageChange,
		handleOrderSelect,
		handleDirectionSelect,
	} = useListOverride();
	const { setPagina, setActivatedTag } = useOutletContext<IOutletContextType>();

	useEffect(() => {
		setPagina("overrides")
		setActivatedTag("listOverrides")
	})

	if (loading) return <Loading />;
	if (errorMessage) return <ErrorAlert errorMessage={errorMessage} />;

	return (
		<>
			
			<SearchBar
				onSearchChange={onSearchChange}
				orderOptions={orderOptions}
				onOptionChange={handleOrderSelect}
				onDirectionChange={handleDirectionSelect}
			/>
			<FlexibleTable
				data={overrides}
				keysBlackList={["generationTime"]}
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
