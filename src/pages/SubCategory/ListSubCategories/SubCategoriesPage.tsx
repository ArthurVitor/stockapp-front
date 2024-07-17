import { useEffect, useState } from "react";
import { FlexibleTable } from "../../../components/FlexibleTable/FlexibleTable";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import IListSubcategory from "../../../lib/interfaces/subcategory/IListSubcategory";
import { getAllSubcategories, getSubcategoryById } from "../../../services/SubcategoryService";
import { Loading } from "../../../components/Loading/Loading";
import { ErrorAlert } from "../../../components/ErrorAlert/ErrorAlert";
import parseErrorMessage from "../../../utils/ParseErrorMessage";
import Pagination from "../../../components/Pagination/Pagination";
import { useOutletContext } from "react-router-dom";
import { IOutletContextType } from "../../../lib/interfaces/header/IOutletContextType";

const orderOptions = ["Name", "Id"];

export function SubCategoriesPage() {
	const [subcategories, setSubcategories] = useState<IListSubcategory[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [totalRecords, setTotalRecords] = useState<number>(0);
	const [skip, setSkip] = useState<number>(0);
	const [take] = useState<number>(8);
	const [orderOption, setOrderOption] = useState<string>("id");
	const [isAscending, setIsAscending] = useState<boolean>(false);
	const { setPagina, setActivatedTag } = useOutletContext<IOutletContextType>();

	useEffect(() => {
		setPagina("subCategories");
		setActivatedTag("listSubCategories");
	});

	const onSearchChange = async (value: string) => {
		if (value === "") {
			setSkip(0);
			fetchData();
		} else {
			const id = Number(value);
			if (!isNaN(id)) {
				try {
					const subcategory = await getSubcategoryById(id);
					setSubcategories(subcategory ? [subcategory] : []);
				} catch (error: any) {
					setSubcategories([]);
				}
			}
		}
	};

	const fetchData = async () => {
		try {
			const pagedSubcategories = await getAllSubcategories(skip, take, orderOption, isAscending);
			setSubcategories(pagedSubcategories.records);
			setTotalRecords(pagedSubcategories.totalRecords);
		} catch (error: any) {
			setErrorMessage(parseErrorMessage(error.message));
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
				data={subcategories}
				keysBlackList={[]}
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
