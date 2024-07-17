import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { ICreateEntryNote } from "../lib/interfaces/entryNote/ICreateEntryNote";
import { useNavigate } from "react-router-dom";
import parseErrorMessage from "../utils/ParseErrorMessage";
import { CreateEntryNote } from "../services/EntryNoteService";
import IsParametersViolated from "../utils/CheckParameters";
import { NoteTypeEnum } from "../lib/enums/NoteTypeEnum";
import * as Yup from "yup";
import { useQuantityOfProductsInInventory } from "./useQuantityOfProductsInInventory";
import { useFetchProductsAndInventories } from "./useFetchProductsAndInventories";

export const useEntryNoteForm = () => {
	const [errorMessage, setErrorMessage] = useState<string>("");
	const {
		products,
		inventories,
		errorMessage: fetchErrorMessage,
	} = useFetchProductsAndInventories();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [entryNoteData, setEntryNoteData] = useState<ICreateEntryNote | null>(null);
	const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
	const [selectedInventoryId, setSelectedInventoryId] = useState<number | null>(null);
	const { calculateProductQuantities, productQuantities } =
		useQuantityOfProductsInInventory(inventories);
	const navigate = useNavigate();

	const entryNoteSchema = Yup.object().shape({
		ExpiryDate: Yup.date().nullable(),
		Price: Yup.number().positive("Price must be positive.").required("Price is required."),
		Quantity: Yup.number().positive("Quantity must be positive.").required("Quantity is required."),
		Product: Yup.string().required("Product is required."),
		Inventory: Yup.string().required("Inventory is required."),
	});

	const handleProductChange = (
		value: string,
		setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
	) => {
		const selectedProduct = products.find((product) => product.id === Number(value));
		const isPerishable = selectedProduct ? selectedProduct.perishable : false;

		setFieldValue("Product", value);
		setSelectedProductId(Number(value));
		if (!isPerishable) {
			setFieldValue("ExpiryDate", null);
		}

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

	const handleSubmit = async (values: any, actions: any) => {
		try {
			const data: ICreateEntryNote = {
				expiryDate: values.ExpiryDate,
				inventoryId: parseInt(values.Inventory),
				price: parseFloat(values.Price),
				productId: parseInt(values.Product),
				quantity: parseFloat(values.Quantity),
			};

			const availableQuantity = productQuantities[values.Inventory] || 0;
			const limitsExceeded: boolean = await IsParametersViolated(
				NoteTypeEnum.ENTRY,
				data.productId,
				data.inventoryId,
				data.quantity,
				availableQuantity
			);

			if (limitsExceeded) {
				setEntryNoteData(data);
				onOpen();
			} else {
				await CreateEntryNote(data);
				navigate("/entry-notes");
			}
		} catch (error: any) {
			setErrorMessage(parseErrorMessage(error));
		} finally {
			actions.setSubmitting(false);
		}
	};

	const handleConfirm = async () => {
		if (entryNoteData) {
			try {
				await CreateEntryNote(entryNoteData);
				navigate("/entry-notes");
			} catch (error: any) {
				setErrorMessage(parseErrorMessage(error));
			} finally {
				onClose();
			}
		}
	};

	return {
		products,
		inventories,
		selectedProductId,
		errorMessage,
		isOpen,
		entryNoteSchema,
		selectedInventoryId,
		productQuantities,
		fetchErrorMessage,
		calculateProductQuantities,
		onClose,
		handleProductChange,
		handleInventoryChange,
		handleSubmit,
		handleConfirm,
	};
};