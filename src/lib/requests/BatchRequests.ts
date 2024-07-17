import IListBatch from "../interfaces/batch/IListBatch";
import IPagedResult from "../interfaces/pagination/IPagedResult";
import { api } from "./api";

export const fetchAvaliableBatches = async (
	skip: number,
	take: number,
	orderBy: string,
	isAscending: boolean
): Promise<IPagedResult<IListBatch>> => {
	try {
		const response = await api.get<IPagedResult<IListBatch>>(
			`/api/batch?skip=${skip}&take=${take}&orderBy=${orderBy}&isAscending=${isAscending}`
		);
		return response.data;
	} catch (error: any) {
		if (error.response?.data) {
			throw new Error(JSON.stringify(error.response.data));
		} else {
			throw new Error("An error occurred while fetching batches.");
		}
	}
};

export const fetchAvaliableBatchById = async (id: number): Promise<IListBatch> => {
	try {
		const response = await api.get<IListBatch>(`/api/batch/avaliable/${id}`);
		return response.data;
	} catch (error: any) {
		if (error.response?.data) {
			throw new Error(JSON.stringify(error.response.data));
		} else {
			throw new Error("An error occurred while fetching avaliable batch.");
		}
	}
};

export const fetchExpiredBatchById = async (id: number): Promise<IListBatch> => {
	try {
		const response = await api.get<IListBatch>(`/api/batch/expired/${id}`);
		return response.data;
	} catch (error: any) {
		if (error.response?.data) {
			throw new Error(JSON.stringify(error.response.data));
		} else {
			throw new Error("An error occurred while fetching expired batch.");
		}
	}
};

export const deleteBatchByidRequest = async (id: number): Promise<void> => {
	try {
		const response = await api.delete(`/api/batch/${id}`);
		return response.data;
	} catch (error: any) {
		if (error.response?.data) throw new Error(JSON.stringify(error.response.data));
		throw new Error("An error occurred while fetching expired batch.");
	}
};
