import { AxiosError } from "axios";
import ICreateParameters from "../interfaces/parameters/ICreateParameters";
import IListParameters from "../interfaces/parameters/IListParameters";
import IPagedResult from "../interfaces/pagination/IPagedResult";
import { api } from "./api";

export const fetchAllParameters = async ( skip: number, take: number, orderBy: string, isAscending: boolean ): Promise<IPagedResult<IListParameters>> => {
	try {
		const response = await api.get<IPagedResult<IListParameters>>(
			`api/Parameters?skip=${skip}&take=${take}&orderBy=${orderBy}&isAscending=${isAscending}`
		);
		return response.data;
	} catch (error: any) {
		if (error.response?.data) {
			throw new Error(JSON.stringify(error.response.data));
		} else {
			throw new Error("An error occurred while fetching parameters.");
		}
	}
};

export const createParametersRequest = async ( parameters: ICreateParameters): Promise<ICreateParameters> => {
	try {
		const response = await api.post<ICreateParameters>("/api/parameters", parameters);
		return response.data;
	} catch (error: any) {
		if (error.response?.data) {
			throw new Error(JSON.stringify(error.response.data));
		} else {
			throw new Error("An error occurred while creating parameters.");
		}
	}
};

export const getParametersByInventoryIdAndProductIdRequest = async ( inventoryId: number, productId: number ): Promise<IListParameters | null> => {
	try {
		const response = await api.get<IListParameters>(
			`/api/parameters/byInventoryAndProduct?inventoryId=${inventoryId}&productId=${productId}`
		);
		return response.data;
	} catch (error: any) {
		if (error.isAxiosError && (error as AxiosError)?.response?.status === 404) {
			return null;
		} else if (error.response?.data) {
			throw new Error(JSON.stringify(error.response.data));
		}
		
		throw new Error("An error occurred while fetching the parameter.");	
	}
};

export const getParametersByidRequest = async (id:number): Promise<IListParameters> => {
	try {
		const response = await api.get<IListParameters>(`/api/Parameters/${id}`);
		return response.data;
	} catch (error: any) {
		if (error.response?.data) {
			throw new Error(JSON.stringify(error.response.data));
		} else {
			throw new Error("An error occurred while fetching parameter.");
		}
	}
}
