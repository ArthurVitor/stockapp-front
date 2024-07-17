import ICreateParameters from "../lib/interfaces/parameters/ICreateParameters";
import IListParameters from "../lib/interfaces/parameters/IListParameters";
import IPagedResult from "../lib/interfaces/pagination/IPagedResult";
import { createParametersRequest, fetchAllParameters, getParametersByidRequest, getParametersByInventoryIdAndProductIdRequest } from "../lib/requests/ParametersRequests";

export const getAllParameters = async (skip: number, take: number, orderBy: string, isAscending: boolean): Promise<IPagedResult<IListParameters>> => {
	try {
		const parameters = await fetchAllParameters(skip, take, orderBy, isAscending);
		return parameters;
	} catch (error) {
		console.error("Error in getAllParameters from Parameters service:", error);
		throw error;
	}
};

export const createParameters = async (parameters: ICreateParameters): Promise<ICreateParameters> => {
	try {
		const newParameters = await createParametersRequest(parameters);
		return newParameters;
	} catch (error) {
		console.error("Error in createParameters from Parameters service:", error);
		throw error;
	}
};

export const getParametersByInventoryIdAndProductId = async (inventoryId: number, productId: number) : Promise<IListParameters | null> => {
	try {
		const parameter = await getParametersByInventoryIdAndProductIdRequest(inventoryId,productId);
		return parameter || null; 
	} catch (error) {
		console.error("Error in getParametersByInventoryIdAndProductId from Parameters service:", error);
		throw error;
	}
}

export const getParametersById = async (id:number) : Promise<IListParameters> => {
	try {
		const parameter = await getParametersByidRequest(id);
		return parameter;
	} catch (error) {
		console.error("Error in getParametersById from Parameters service:", error);
		throw error;
	}
}