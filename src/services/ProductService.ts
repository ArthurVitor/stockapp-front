import { ICreateProduct } from "../lib/interfaces/product/ICreateProduct";
import IPagedResult from "../lib/interfaces/pagination/IPagedResult";
import { createProduct, fetchAllProducts, getProductById } from "../lib/requests/ProductRequests";
import { IListProduct } from "../lib/interfaces/product/IListProduct";


export async function GetAllProducts(skip: number, take: number, orderBy: string = "", isAscending: boolean = true): Promise<IPagedResult<IListProduct>> {
    try{
        const pagedProducts = await fetchAllProducts(skip, take, orderBy, isAscending);
        return pagedProducts;
    } catch (error) {
        console.error("Error while fetching resources from origin")
        throw(error);
    }
}

export async function CreateProductService(props: ICreateProduct): Promise<ICreateProduct> {
    try {
        const data = await createProduct(props);
        return data;
    }
    catch (error){
        console.error(error)
        throw error;
    }
}

export async function GetProductById(productId: number): Promise<IListProduct> {
    try {
        const data = await getProductById(productId);
        return data;
    }
    catch(error) {
        console.error(error)
        throw error;
    }
}