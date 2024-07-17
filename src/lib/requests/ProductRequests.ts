import { api } from "./api";
import { ICreateProduct } from "../interfaces/product/ICreateProduct";
import IPagedResult from "../interfaces/pagination/IPagedResult";
import { IListProduct } from "../interfaces/product/IListProduct";

export async function fetchAllProducts(
	skip: number,
	take: number,
	orderBy: string,
	isAscending: boolean
): Promise<IPagedResult<IListProduct>> {
	try {
		const response = await api.get<IPagedResult<IListProduct>>(
			`api/Product?skip=${skip}&take=${take}&orderBy=${orderBy}&isAscending=${isAscending}`
		);
		return response.data;
	} catch (error: any) {
		if (error.response?.data) {
			throw new Error(JSON.stringify(error.response.data));
		} else {
			throw new Error("An error occurred while fetching products.");
		}
	}
}

export async function createProduct(props: ICreateProduct): Promise<ICreateProduct> {
	try {
		const response = await api.post<ICreateProduct>("api/Product", props);
		return response.data;
	} catch (error: any) {
		if (error.response?.data) {
			throw new Error(JSON.stringify(error.response.data));
		} else {
			throw new Error("An error occurred while creating product.");
		}
	}
}

export async function getProductById(productId: number): Promise<IListProduct> {
	try {
		const response = await api.get<IListProduct>(`api/Product/${productId}`);
		return response.data;
	} catch (error: any){
		if(error.response?.data){
			throw new Error(JSON.stringify(error.response.data));
		}
		throw new Error("Error Fetching Data");
	}
}