import IListOverride from "../lib/interfaces/override/IListOverride";
import IPagedResult from "../lib/interfaces/pagination/IPagedResult";
import { fetchAllOverrides, getOverrideByidRequest } from "../lib/requests/OverrideRequests";

export const getAllOverrides = async (skip: number, take: number, orderBy: string, isAscending: boolean ): Promise<IPagedResult<IListOverride>> => {
	try {
		const overrides = await fetchAllOverrides(skip, take, orderBy, isAscending);
		return overrides;
	} catch (error) {
		console.error("Error in getAllOverrides from Override service:", error);
		throw error;
	}
};

export const getOverrideByid = async (id: number): Promise<IListOverride> => {
	try {
		const override = await getOverrideByidRequest(id);
		return override; 
	} catch (error) {
		console.error("Error in getOverrideByid from Override service:", error);
		throw error;
	}
}