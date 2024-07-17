import { useEffect, useState } from "react";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { getAllInventories, getInventoryById } from "../../../services/InventoryService";
import { Loading } from "../../../components/Loading/Loading";
import { ErrorAlert } from "../../../components/ErrorAlert/ErrorAlert";
import { FlexibleTable } from "../../../components/FlexibleTable/FlexibleTable";
import parseErrorMessage from "../../../utils/ParseErrorMessage";
import Pagination from "../../../components/Pagination/Pagination";
import { useOutletContext } from "react-router-dom";
import { IOutletContextType } from "../../../lib/interfaces/header/IOutletContextType";
import IListInventory from "../../../lib/interfaces/inventory/IListInventory";

const orderOptions = ["Name", "Id"];

export function InventoriesPage() {
	const [inventories, setInventories] = useState<IListInventory[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [totalRecords, setTotalRecords] = useState<number>(0);
	const [skip, setSkip] = useState<number>(0);
	const [take] = useState<number>(8);
	const [orderOption, setOrderOption] = useState<string>("id");
	const [isAscending, setIsAscending] = useState<boolean>(false);
	const { setPagina, setActivatedTag } = useOutletContext<IOutletContextType>();

	useEffect(() => {
		setPagina("inventories")
		setActivatedTag("listInventories")
	})

	const onSearchChange = async (value: string) => {
		if (value === "") {
			setSkip(0);
			fetchData();
		} else {
			const id = Number(value);
			if (!isNaN(id)) {
				try {
					const inventory = await getInventoryById(id);
					setInventories(inventory ? [inventory] : []);
				} catch (error: any) {
					setInventories([]);
				}
			}
		}
	};

	const fetchData = async () => {
		try {
			const data = await getAllInventories(skip, take, orderOption, isAscending);
			const simplifiedData = data.records.map((item) => ({
				id: item.id,
				name: item.name,
				batches: item.batches,
				batchesCount: item.batches.length,
			}));
			setInventories(simplifiedData);
			setTotalRecords(data.totalRecords);
		} catch (error) {
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
				orderOptions={orderOptions}
				onOptionChange={handleOrderSelect}
				onDirectionChange={handleDirectionSelect}
			/>
			<FlexibleTable
				data={inventories}
				keysBlackList={["batches"]}
				size={"lg"}
				variant={"striped"}
				bgColor="white"
				thColor="#F6F6F6"
				detailedListUrl="inventory"
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
