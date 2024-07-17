import IListBatch from "../lib/interfaces/batch/IListBatch";
import IPagedResult from "../lib/interfaces/pagination/IPagedResult";
import {
	fetchAvaliableBatches,
	fetchAvaliableBatchById,
	fetchExpiredBatchById,
	deleteBatchByidRequest,
} from "../lib/requests/BatchRequests";

export const getAllAvaliableBatches = async (
	skip: number,
	take: number,
	orderBy: string = "id",
	isAscending: boolean = true
): Promise<IPagedResult<IListBatch>> => {
	try {
		const pagedBatches = await fetchAvaliableBatches(skip, take, orderBy, isAscending);
		return pagedBatches;
	} catch (error) {
		console.error("Error in getAllBatches from Batch service:", error);
		throw error;
	}
};

export const getAvaliableBatchById = async (id: number): Promise<IListBatch> => {
	try {
		const batch = await fetchAvaliableBatchById(id);
		return batch;
	} catch (error) {
		console.log("Error in getBatchById from Batch service: ", error);
		throw error;
	}
};

export const getExpiredBatchByid = async (id: number): Promise<IListBatch> => {
	try {
		const batch = await fetchExpiredBatchById(id);
		return batch;
	} catch (error) {
		console.log("Error in getBatchById from Batch service: ", error);
		throw error;
	}
};

export const deleteBatchById = async (id: number): Promise<void> => {
	try {
		const response = await deleteBatchByidRequest(id);
		return response;
	} catch (error) {
		console.log("Error in deleteBatchById from Batch service: ", error);
		throw error;
	}
};
