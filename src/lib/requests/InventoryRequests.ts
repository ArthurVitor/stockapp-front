import ICreateInventory from "../interfaces/inventory/ICreateInventory";
import IListInventory from "../interfaces/inventory/IListInventory";
import IPagedResult from "../interfaces/pagination/IPagedResult";
import { api } from "./api";

export const fetchAllInventories = async (
	skip: number,
	take: number,
	orderBy: string,
	isAscending: boolean
): Promise<IPagedResult<IListInventory>> => {
	try {
		const response = await api.get<IPagedResult<IListInventory>>(
			`api/Inventory?skip=${skip}&take=${take}&orderBy=${orderBy}&isAscending=${isAscending}`
		);
		return response.data;
	} catch (error: any) {
		if (error.response?.data) {
			throw new Error(JSON.stringify(error.response.data));
		} else {
			throw new Error("An error occurred while fetching inventories.");
		}
	}
};

export const createInventoryRequest = async (
	inventory: ICreateInventory
): Promise<ICreateInventory> => {
	try {
		const response = await api.post<ICreateInventory>("/api/inventory", inventory);
		return response.data;
	} catch (error: any) {
		if (error.response?.data) {
			throw new Error(JSON.stringify(error.response.data));
		} else {
			throw new Error("An error occurred while creating inventory.");
		}
	}
}

export const getInventoryByIdRequest = async (id: number): Promise<IListInventory> => {
	try {
		const response = await api.get<IListInventory>(`/api/Inventory/${id}`);
		return response.data;
	} catch (error: any) {
		if (error.response?.data) {
			throw new Error(JSON.stringify(error.response.data));
		} else {
			throw new Error("An error occurred while fetching inventory.");
		}
	}
}
