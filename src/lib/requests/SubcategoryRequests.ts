import ICreateSubcategory from "../interfaces/subcategory/ICreateSubcategory";
import IListSubcategory from "../interfaces/subcategory/IListSubcategory";
import IPagedResult from "../interfaces/pagination/IPagedResult";
import { api } from "./api";

export const fetchSubcategories = async (skip: number, take: number, orderBy: string = "", isAscending: boolean = true): Promise<IPagedResult<IListSubcategory>> => {
	try {
		const response = await api.get<IPagedResult<IListSubcategory>>(`api/SubCategories?skip=${skip}&take=${take}&orderBy=${orderBy}&isAscending=${isAscending}`);
		return response.data;
	} catch (error: any) {
		if (error.response?.data) {
            throw new Error(JSON.stringify(error.response.data));
		} else {
			throw new Error("An error occurred while fetching subcategories.");
		}
	}
};

export const createSubcategoryRequest = async (subcategory: ICreateSubcategory): Promise<ICreateSubcategory> => {
    try {
        const response = await api.post<ICreateSubcategory>("/api/SubCategories", subcategory);
        return response.data;
    } catch (error: any) {
		if (error.response?.data) {
            throw new Error(JSON.stringify(error.response.data));
		} else {
			throw new Error("An error occurred while creating subcategory.");
		}
	}
};

export const getSubcategoryByIdRequest = async (id:number): Promise<IListSubcategory> => {
	try {
		const response = await api.get<IListSubcategory>(`/api/Subcategories/${id}`); 
		return response.data; 
	} catch (error: any) {
		if (error.response?.data) {
            throw new Error(JSON.stringify(error.response.data));
		} else {
			throw new Error("An error occurred while fetching subcategory.");
		}
	}
}
