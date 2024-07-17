import { Box } from "@chakra-ui/react";
import { ReallocateBatchForm } from "../ReallocateBatchForm/ReallocateBatchForm";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { IOutletContextType } from "../../../lib/interfaces/header/IOutletContextType";
import "./ReallocateBatchPage.css";

export function ReallocateBatchPage() {
	const { setPagina, setActivatedTag } = useOutletContext<IOutletContextType>();

	useEffect(() => {
		setPagina("adminRoute");
		setActivatedTag("reallocateBatch");
	});

	return (
		<Box className="wrap-box">
			<Box p={3} w="50%" maxW="80%" minW="60%" maxHeight="100%">
				<ReallocateBatchForm />
			</Box>
		</Box>
	);
}
