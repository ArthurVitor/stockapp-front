import ICreateInventory from "../lib/interfaces/inventory/ICreateInventory";
import IListInventory from "../lib/interfaces/inventory/IListInventory";
import IPagedResult from "../lib/interfaces/pagination/IPagedResult";
import { createInventoryRequest, fetchAllInventories, getInventoryByIdRequest } from "../lib/requests/InventoryRequests";

export const getAllInventories = async (skip: number, take: number, orderBy: string = "id", isAscending: boolean = true): Promise<IPagedResult<IListInventory>> => {
	try {
		const inventories = await fetchAllInventories(skip, take, orderBy, isAscending);
		return inventories;
	} catch (error) {
		console.error("Error in getAllInventories from Inventory service:", error);
		throw error;
	}
};

export const createInventory = async (inventory: ICreateInventory): Promise<ICreateInventory> => {
	try {
		const newInventory = await createInventoryRequest(inventory);
		return newInventory;
	} catch (error) {
		console.error("Error in createInventory from Inventory service:", error);
		throw error;
	}
};

export const getInventoryById = async (id: number): Promise<IListInventory> => {
	try {
		const inventory = await getInventoryByIdRequest(id); 
		return inventory; 
	} catch (error) {
		console.error("Error in getInventoryById from inventory service:", error);
		throw error; 
	}
}
