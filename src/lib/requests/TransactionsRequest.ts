import IlIstTransactions from "../interfaces/transactions/IListTransactions";
import IPagedResult from "../interfaces/pagination/IPagedResult";
import { api } from "./api";

export const fetchTransactions = async (
	skip: number,
	take: number,
	orderBy: string,
	isAscending: boolean
): Promise<IPagedResult<IlIstTransactions>> => {
	try {
		const response = await api.get<IPagedResult<IlIstTransactions>>(
			`/api/transactions?skip=${skip}&take=${take}&orderBy=${orderBy}&isAscending=${isAscending}`
		);
		return response.data;
	} catch (error: any) {
		if (error.response?.data) throw new Error(JSON.stringify(error.response.data));
		throw new Error("An error occurred while fetching transactions.");
	}
};

export const getTransactionByIdRequest = async (id: number): Promise<IlIstTransactions> => {
	try {
		const response = await api.get<IlIstTransactions>(`api/transactions/id/${id}`);
		return response.data;
	} catch (error: any) {
		if (error.response?.data) throw new Error(JSON.stringify(error.response.data));
		throw new Error("An error occurred while fetching transactions.");
	}
};
