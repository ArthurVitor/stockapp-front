import IlIstTransactions from "../lib/interfaces/transactions/IListTransactions";
import IPagedResult from "../lib/interfaces/pagination/IPagedResult";
import { fetchTransactions, getTransactionByIdRequest } from "../lib/requests/TransactionsRequest";

export const getAllTransactions = async (
	skip: number,
	take: number,
	orderBy: string,
	isAscending: boolean
): Promise<IPagedResult<IlIstTransactions>> => {
	try {
		const pagedTransactioms = await fetchTransactions(skip, take, orderBy, isAscending);
		return pagedTransactioms;
	} catch (error) {
		console.error("Error in getAllTransactions from Transactions service:", error);
		throw error;
	}
};

export const getTransactionById = async (id: number): Promise<IlIstTransactions> => {
	try {
		const transaction = await getTransactionByIdRequest(id);
		return transaction;
	} catch (error) {
		console.error("Error in getAllTransactions from Transactions service:", error);
		throw error;
	}
};
