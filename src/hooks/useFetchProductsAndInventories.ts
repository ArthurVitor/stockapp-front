import { useEffect, useState } from "react";
import { GetAllProducts } from "../services/ProductService";
import { getAllInventories } from "../services/InventoryService";
import parseErrorMessage from "../utils/ParseErrorMessage";
import { IListProduct } from "../lib/interfaces/product/IListProduct";
import IListInventory from "../lib/interfaces/inventory/IListInventory";

export const useFetchProductsAndInventories = () => {
	const [products, setProducts] = useState<IListProduct[]>([]);
	const [inventories, setInventories] = useState<IListInventory[]>([]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;
		const fetchProductsAndInventories = async () => {
			try {
				const [fetchedProducts, fetchedInventories] = await Promise.all([
					GetAllProducts(0, 999),
					getAllInventories(0, 999),
				]);
				if (isMounted) {
					setProducts(fetchedProducts.records);
					setInventories(fetchedInventories.records);
				}
			} catch (error: any) {
				if (isMounted) {
					setErrorMessage(parseErrorMessage(error));
				}
			}
		};

		fetchProductsAndInventories();
		return () => {
			isMounted = false;
		};
	}, []);

	return { products, inventories, errorMessage, setErrorMessage, setProducts, setInventories };
};
