import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { GetProductById } from "../../../services/ProductService";
import { DetailedView } from "../../../components/DetailedView/DetailedView";
import { IOutletContextType } from "../../../lib/interfaces/header/IOutletContextType";
import { IListProduct } from "../../../lib/interfaces/product/IListProduct";

export default function DetailedProductView() {
	const { productId } = useParams();
	const [product, setProduct] = useState<IListProduct>();
	const { setPagina, setActivatedTag } = useOutletContext<IOutletContextType>();

	useEffect(() => {
		setPagina("product");
		setActivatedTag("");
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const _product = await GetProductById(Number(productId));
				setProduct(_product);
			} catch (error: any) {
				console.error(error.status);
			}
		};

		fetchData();
	}, [productId]);

	return (
		<DetailedView
			title="Product"
			dependencies={[product?.subCategories || []]}
			entity={product || {}}
			keysBlackList={["subCategories"]}
			dependenciesTitles={["SubCategories"]}
		/>
	);
}
