import { importProduct, importSubCategories } from "../lib/requests/FileImportingRequests";

export async function ImportProductService(file: FormData): Promise<void> {
    try {
        const reponse = importProduct(file);

        return reponse;
    }
    catch(error){
        console.error(error)
        throw(error);
    }
}

export async function ImportSubCategoriesService(file: FormData): Promise<void> {
    try {
        const response = await importSubCategories(file);
        
        return response;
    }
    catch(error){
        console.error(error)
        throw(error)
    }
}