import IListOverride from "../interfaces/override/IListOverride";
import IPagedResult from "../interfaces/pagination/IPagedResult";
import { api } from "./api";

export const fetchAllOverrides = async (skip: number, take: number, orderBy: string, isAscending: boolean ): Promise<IPagedResult<IListOverride>> => {
	try{
		const response = await api.get<IPagedResult<IListOverride>>(`api/Override?skip=${skip}&take=${take}&orderBy=${orderBy}&isAscending=${isAscending}`);
		return response.data;
	} catch (error: any) {
		if (error.response?.data) {
			throw new Error(JSON.stringify(error.response.data));
		} else {
			throw new Error("An error occurred while fetching overrides.");
		}
	}
}

export const getOverrideByidRequest = async (id: number): Promise<IListOverride> => {
	try {
		const response = await api.get<IListOverride>(`/api/Override/${id}`);
		return response.data;
	} catch (error: any) {
		if(error.response?.data) {
			throw new Error(JSON.stringify(error.response.data));
		} else {
			throw new Error("An error occurred while fetching override.");
		}
	}
}