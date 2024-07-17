import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { FlexibleTable } from "../../../components/FlexibleTable/FlexibleTable";
import { GetAllProducts, GetProductById } from "../../../services/ProductService";
import { Loading } from "../../../components/Loading/Loading";
import { ErrorAlert } from "../../../components/ErrorAlert/ErrorAlert";
import parseErrorMessage from "../../../utils/ParseErrorMessage";
import Pagination from "../../../components/Pagination/Pagination";
import { useOutletContext } from "react-router-dom";
import { IOutletContextType } from "../../../lib/interfaces/header/IOutletContextType";

const orderOptions = ["Id", "Name", "Perishable"];

export function ProductsPage() {
	const [products, setProducts] = useState<Record<string, any>[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [totalRecords, setTotalRecords] = useState<number>(0);
	const [skip, setSkip] = useState<number>(0);
	const [take] = useState<number>(8);
	const [orderOption, setOrderOption] = useState<string>("id");
	const [isAscending, setIsAscending] = useState<boolean>(false);
	const { setPagina, setActivatedTag } = useOutletContext<IOutletContextType>();

	useEffect(() => {
		setPagina("product");
		setActivatedTag("listProducts");
	});

	const onSearchChange = async (value: string) => {
		if (value === "") {
			setSkip(0);
			fetchData();
		} else {
			const id = Number(value);
			if (!isNaN(id)) {
				try {
					const exitNote = await GetProductById(id);
					setProducts(exitNote ? [exitNote] : []);
				} catch (error: any) {
					setProducts([]);
				}
			}
		}
	};

	const fetchData = async () => {
		try {
			const products = await GetAllProducts(skip, take, orderOption, isAscending);
			setProducts(products.records);
			setTotalRecords(products.totalRecords);
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
				bgColor="white"
				data={products}
				keysBlackList={["subCategories"]}
				size="lg"
				variant="striped"
				thColor="#F6F6F6"
				detailedListUrl="product"
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
