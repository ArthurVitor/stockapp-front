import ICreateSubcategory from "../lib/interfaces/subcategory/ICreateSubcategory";
import IListSubcategory from "../lib/interfaces/subcategory/IListSubcategory";
import IPagedResult from "../lib/interfaces/pagination/IPagedResult";
import { createSubcategoryRequest, fetchSubcategories, getSubcategoryByIdRequest } from "../lib/requests/SubcategoryRequests";

export const getAllSubcategories = async (skip: number, take: number, orderBy: string = "", isAscending: boolean = true): Promise<IPagedResult<IListSubcategory>> => {
	try {
		const pagedSubcategories = await fetchSubcategories(skip, take, orderBy, isAscending);
		return pagedSubcategories;
	} catch (error) {
		console.error("Error in getSubcategories from Subcategories service:", error);
		throw error;
	}
};

export const createSubcategory = async (subcategory: ICreateSubcategory): Promise<ICreateSubcategory> => {
	try {
		const newSubcategory = await createSubcategoryRequest(subcategory);
		return newSubcategory;
	} catch (error) {
		console.error("Error in createSubcategory from Subcategories service:", error);
		throw error;
	}
};

export const getSubcategoryById = async (id: number): Promise<IListSubcategory> => {
	try {
		const subcategory = await getSubcategoryByIdRequest(id);
		return subcategory;
	} catch (error) {
		console.error("Error in getSubcategoryById from Subcategories service:", error);
		throw error;
	}
}