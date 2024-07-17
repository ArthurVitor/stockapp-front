import { Box } from "@chakra-ui/react";
import { EntryNoteForm } from "../EntryNoteForm/EntryNoteForm";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { IOutletContextType } from "../../../lib/interfaces/header/IOutletContextType";

export function CreateEntryNotePage() {
	const { setPagina, setActivatedTag } = useOutletContext<IOutletContextType>();

	useEffect(() => {
		setPagina("entryNotes");
		setActivatedTag("createEntryNote");
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
				<EntryNoteForm />
			</Box>
		</Box>
	);
}
