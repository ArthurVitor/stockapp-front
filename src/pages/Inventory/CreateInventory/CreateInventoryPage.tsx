import { Box } from "@chakra-ui/react";
import { InventoryForm } from "../InventoryForm/InventoryForm";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { IOutletContextType } from "../../../lib/interfaces/header/IOutletContextType";

export function CreateInventoryPage() {
	const { setPagina, setActivatedTag } = useOutletContext<IOutletContextType>();

	useEffect(() => {
		setPagina("inventories");
		setActivatedTag("createInventory");
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
				<InventoryForm />
			</Box>
		</Box>
	);
}
