import IListBatch from "../interfaces/batch/IListBatch";
import IPagedResult from "../interfaces/pagination/IPagedResult";
import IReallocateBatch from "../interfaces/admin/IReallocateBatch";
import { api } from "./api";

export const fetchPerishedBatches = async (
	skip: number,
	take: number,
	orderBy: string,
	isAscending: boolean
): Promise<IPagedResult<IListBatch>> => {
	try {
		const response = await api.get<IPagedResult<IListBatch>>(
			`/api/admin/getAllPerishedBatches?skip=${skip}&take=${take}&orderBy=${orderBy}&isAscending=${isAscending}`
		);
		return response.data;
	} catch (error: any) {
		if (error.response?.data) throw new Error(JSON.stringify(error.response.data));
		throw new Error("An error occurred while fetching batches.");
	}
};

export const deleteAllExpiredBatchesRequest = async (): Promise<void> => {
	try {
		const response = await api.post(`/api/admin/deleteAllPerishedBatches`);
		return response.data;
	} catch (error: any) {
		if (error.response?.data) throw new Error(JSON.stringify(error.response.data));
		throw new Error("An error occurred while deleting all batches.");
	}
};

export const reverseTransactionRequest = async (overrideId: number): Promise<void> => {
	try {
		const response = await api.post(`/api/admin/reverse-transaction`, { overrideId });
		return response.data;
	  } catch (error: any) {
		if (error.response?.data) throw new Error(JSON.stringify(error.response.data));
		throw new Error("An error occurred while reversing the override transaction.");
	  }
}

export const reallocateBatchRequest = async (reallocateData: IReallocateBatch): Promise<void> => {
	try {
		const response = await api.post(`/api/admin/reallocateBatch`, reallocateData);
		return response.data;
	} catch (error: any) {
		if (error.response?.data) throw new Error(JSON.stringify(error.response.data));
		throw new Error("An error occurred while reallocating the batch.");
	  }
}
