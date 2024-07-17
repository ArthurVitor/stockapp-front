import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { ICreateExitNote } from "../lib/interfaces/exitNote/ICreateExitNote";
import { useQuantityOfProductsInInventory } from "./useQuantityOfProductsInInventory";
import parseErrorMessage from "../utils/ParseErrorMessage";
import { CreateExitNote } from "../services/ExitNoteService";
import { NoteTypeEnum } from "../lib/enums/NoteTypeEnum";
import IsParametersViolated from "../utils/CheckParameters";
import * as Yup from "yup";
import { useFetchProductsAndInventories } from "./useFetchProductsAndInventories";

export const useExitNoteForm = () => {
	const [errorMessage, setErrorMessage] = useState<string>("");
	const {
		products,
		inventories,
		errorMessage: fetchErrorMessage,
	} = useFetchProductsAndInventories();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [exitNoteDate, setExitNoteData] = useState<ICreateExitNote | null>(null);
	const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
	const [selectedInventoryId, setSelectedInventoryId] = useState<number | null>(null);
	const { calculateProductQuantities, productQuantities } =
		useQuantityOfProductsInInventory(inventories);
	const navigate = useNavigate();

	const handleProductChange = (
		value: string,
		setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
	) => {
		setFieldValue("Product", value);
		setSelectedProductId(Number(value));
		if (selectedInventoryId) {
			calculateProductQuantities(Number(value), selectedInventoryId);
		}
	};

	const handleInventoryChange = (
		value: string,
		setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
	) => {
		setFieldValue("Inventory", value);
		setSelectedInventoryId(Number(value));
		if (selectedProductId) {
			calculateProductQuantities(selectedProductId, Number(value));
		}
	};

	const handleConfirm = async () => {
		if (exitNoteDate) {
			try {
				await CreateExitNote(exitNoteDate);
				navigate("/exit-notes");
			} catch (error: any) {
				setErrorMessage(parseErrorMessage(error));
			} finally {
				onClose();
			}
		}
	};

	const handleSubmit = async (values: any, actions: any) => {
		try {
			const exitNoteData: ICreateExitNote = {
				inventoryId: Number(values.Inventory),
				productId: Number(values.Product),
				quantity: Number(values.Quantity),
			};

			const availableQuantity = productQuantities[values.Inventory] || 0;

			const limitsExceeded: boolean = await IsParametersViolated(
				NoteTypeEnum.EXIT,
				exitNoteData.productId,
				exitNoteData.inventoryId,
				exitNoteData.quantity,
				availableQuantity
			);

			if (limitsExceeded) {
				setExitNoteData(exitNoteData);
				onOpen();
			} else {
				await CreateExitNote(exitNoteData);
				navigate("/exit-notes");
			}
		} catch (error: any) {
			setErrorMessage(parseErrorMessage(error));
		} finally {
			actions.setSubmitting(false);
		}
	};

	const exitNoteSchema = Yup.object().shape({
		Quantity: Yup.number().positive("Quantity must be Positive.").required("Quantity is required."),
		Product: Yup.string().required("Product is required."),
		Inventory: Yup.string().required("Inventory is required."),
	});

	return {
		products,
		inventories,
		errorMessage,
		isOpen,
		selectedProductId,
		selectedInventoryId,
		exitNoteSchema,
		productQuantities,
		fetchErrorMessage,
		handleProductChange,
		handleInventoryChange,
		handleSubmit,
		handleConfirm,
		onClose,
	};
};
