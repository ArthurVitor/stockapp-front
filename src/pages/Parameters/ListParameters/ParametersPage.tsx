import { useEffect, useState } from "react";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import IListParameters from "../../../lib/interfaces/parameters/IListParameters";
import { getAllParameters, getParametersById } from "../../../services/ParametersService";
import { Loading } from "../../../components/Loading/Loading";
import { ErrorAlert } from "../../../components/ErrorAlert/ErrorAlert";
import { FlexibleTable } from "../../../components/FlexibleTable/FlexibleTable";
import parseErrorMessage from "../../../utils/ParseErrorMessage";
import Pagination from "../../../components/Pagination/Pagination";
import { useOutletContext } from "react-router-dom";
import { IOutletContextType } from "../../../lib/interfaces/header/IOutletContextType";

const orderOptions = ["Id"];

export function ParametersPage() {
	const [parameters, setParameters] = useState<IListParameters[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [totalRecords, setTotalRecords] = useState<number>(0);
	const [skip, setSkip] = useState<number>(0);
	const [take] = useState<number>(8);
	const [orderOption, setOrderOption] = useState<string>("id");
	const [isAscending, setIsAscending] = useState<boolean>(false);
	const { setPagina, setActivatedTag } = useOutletContext<IOutletContextType>();

	useEffect(() => {
		setPagina("parameters");
		setActivatedTag("listParameters");
	});

	const onSearchChange = async (value: string) => {
		if (value === "") {
			setSkip(0);
			fetchData();
		} else {
			const id = Number(value);
			if (!isNaN(id)) {
				try {
					const parameter = await getParametersById(id);
					setParameters(parameter ? [parameter] : []);
				} catch (error: any) {
					setParameters([]);
				}
			}
		}
	};

	const fetchData = async () => {
		try {
			const pagedParameters = await getAllParameters(skip, take, orderOption, isAscending);
			setParameters(pagedParameters.records);
			setTotalRecords(pagedParameters.totalRecords);
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
				onDirectionChange={handleDirectionSelect}
				onOptionChange={handleOrderSelect}
			/>
			<FlexibleTable
				data={parameters}
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
