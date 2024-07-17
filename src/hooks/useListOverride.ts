import { useEffect, useState } from "react";
import IListOverride from "../lib/interfaces/override/IListOverride";
import { getAllOverrides, getOverrideByid } from "../services/OverrideService";
import { format } from "date-fns";
import parseErrorMessage from "../utils/ParseErrorMessage";

export const useListOverride = () => {
	const orderOptions = ["Id", "Generation time", "Transactions Id"];

	const [overrides, setOverrides] = useState<IListOverride[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [totalRecords, setTotalRecords] = useState<number>(0);
	const [skip, setSkip] = useState<number>(0);
	const [take] = useState<number>(8);
	const [orderOption, setOrderOption] = useState<string>("id");
	const [isAscending, setIsAscending] = useState<boolean>(false);

	const onSearchChange = async (value: string) => {
		if (value === "") {
			setSkip(0);
			fetchData();
		} else {
			const id = Number(value);
			if (!isNaN(id)) {
				try {
					const override = await getOverrideByid(id);
					setOverrides(override ? [override] : []);
				} catch (error: any) {
					setOverrides([]);
				}
			}
		}
	};

	const fetchData = async () => {
		try {
			const pagedOverrides = await getAllOverrides(skip, take, orderOption, isAscending);
			const formattedData = pagedOverrides.records.map((item) => ({
				...item,
				formattedGenerationTime: format(new Date(item.generationTime), "dd/MM/yyyy HH:mm:ss"),
			}));
			setOverrides(formattedData);
			setTotalRecords(pagedOverrides.totalRecords);
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
	return {
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
		setErrorMessage
	};
};
