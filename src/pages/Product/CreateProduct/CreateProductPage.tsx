import { Box } from "@chakra-ui/react";
import { ProductForm } from "../ProductForm/ProductForm";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { IOutletContextType } from "../../../lib/interfaces/header/IOutletContextType";

export function CreateProduct() {
	const { setPagina, setActivatedTag } = useOutletContext<IOutletContextType>();

	useEffect(() => {
		setPagina("product");
		setActivatedTag("createProduct");
	});

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			height="75vh"
			bgColor={"#Fff"}
			borderRadius={20}
			margin="1%"
		>
			<Box p={3} w="50%" maxW="80%" minW="60%">
				<ProductForm />
			</Box>
		</Box>
	);
}
