import IListBatch from "../lib/interfaces/batch/IListBatch";
import IPagedResult from "../lib/interfaces/pagination/IPagedResult";
import IReallocateBatch from "../lib/interfaces/admin/IReallocateBatch";
import {
	deleteAllExpiredBatchesRequest,
	fetchPerishedBatches,
	reallocateBatchRequest,
	reverseTransactionRequest,
} from "../lib/requests/AdminRequests";

export const getAllPerishedBatches = async (
	skip: number,
	take: number,
	orderBy: string = "id",
	isAscending: boolean = true
): Promise<IPagedResult<IListBatch>> => {
	try {
		const pagedPerishedBatches = await fetchPerishedBatches(skip, take, orderBy, isAscending);
		return pagedPerishedBatches;
	} catch (error) {
		console.error("Error in getAllPerishedBatches from Admin service:", error);
		throw error;
	}
};

export const deleteAllExpiredBatches = async (): Promise<void> => {
	try {
		const response = await deleteAllExpiredBatchesRequest();
		return response;
	} catch (error) {
		console.error("Error in deleteAllExpiredBatches from Admin service:", error);
		throw error;
	}
};

export const reverseTransaction = async (overrideId: number): Promise<void> => {
	try {
		const response = await reverseTransactionRequest(overrideId);
		return response;
	} catch (error) {
		console.error("Error in reverseTransaction from Admin service:", error);
		throw error;
	}
};

export const reallocateBatch = async (reallocateData: IReallocateBatch): Promise<void> => {
	try {
		const response = await reallocateBatchRequest(reallocateData);
		return response;
	} catch (error) {
		console.error("Error in reallocateBatch from Admin service:", error);
		throw error;
	}
};
