import { api } from "./api";

export async function importProduct(file: FormData): Promise<void> {
    try {
      const response = await api.post("api/FileImporting/upload/product", file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

export async function importSubCategories(file: FormData): Promise<void> {
  try {
    const response = await api.post("api/FileImporting/upload/subcategory", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }
  catch(error){
    throw(error)
  }
}