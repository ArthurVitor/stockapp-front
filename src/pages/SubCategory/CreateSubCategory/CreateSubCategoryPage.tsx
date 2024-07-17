import { Box } from "@chakra-ui/react";
import { SubcategoryForm } from "../SubcategoryForm/SubcategoryForm";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { IOutletContextType } from "../../../lib/interfaces/header/IOutletContextType";

export function CreateSubCategoryPage() {
	const { setPagina, setActivatedTag } = useOutletContext<IOutletContextType>();

	useEffect(() => {
		setPagina("subCategories");
		setActivatedTag("createSubCategory");
	});

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			height="75vh"
			bgColor={"#Fff"}
			margin="1%"
			borderRadius={20}
		>
			<Box p={3} w="50%" maxW="80%" minW="60%">
				<SubcategoryForm />
			</Box>
		</Box>
	);
}
