import { useEffect, useState } from "react";
import IlIstTransactions from "../lib/interfaces/transactions/IListTransactions";
import parseErrorMessage from "../utils/ParseErrorMessage";
import { getAllTransactions, getTransactionById } from "../services/TransactionsService";

export const useListTransactions = () => {
    const [transactions, setTransactions] = useState<IlIstTransactions[]>([]);
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
					const transaction = await getTransactionById(id);
					setTransactions(transaction ? [transaction] : []);
				} catch (error: any) {
					setTransactions([]);
				}
			}
		}
	};

	const fetchData = async () => {
		try {
			const pagedTransactions = await getAllTransactions(skip, take, orderOption, isAscending);
			setTransactions(pagedTransactions.records);
			setTotalRecords(pagedTransactions.totalRecords);
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

    return {
        transactions, 
        loading, 
        errorMessage,
        totalRecords,
        skip, 
        take,
        onSearchChange,
        handlePageChange,
        handleOrderSelect,
        handleDirectionSelect   
    }
}