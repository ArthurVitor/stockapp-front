import { useCallback, useMemo, useRef, useState } from "react";
import parseErrorMessage from "../utils/ParseErrorMessage";
import * as Yup from "yup";
import { useQuantityOfProductsInInventory } from "./useQuantityOfProductsInInventory";
import IReallocateBatch from "../lib/interfaces/admin/IReallocateBatch";
import IsParametersViolated from "../utils/CheckParameters";
import { NoteTypeEnum } from "../lib/enums/NoteTypeEnum";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { reallocateBatch } from "../services/AdminService";
import { useFetchProductsAndInventories } from "./useFetchProductsAndInventories";

export function useReallocateBatchForm() {
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
	const [selectedSenderInventoryId, setSelectedSenderInventoryId] = useState<number | null>(null);
	const [selectedRecipientInventoryId, setSelectedRecipientInventoryId] = useState<number | null>(
		null
	);
	const reallocationDataRef = useRef<IReallocateBatch | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [modalMessage, setModalMessage] = useState<string>("");
	const navigate = useNavigate();
	const {
		products,
		inventories,
		errorMessage: fetchErrorMessage,
	} = useFetchProductsAndInventories();
	const { calculateProductQuantities, productQuantities } =
		useQuantityOfProductsInInventory(inventories);

	const filteredSenderInventories = useMemo(() => {
		return inventories.filter((inventory) => inventory.id !== selectedRecipientInventoryId);
	}, [inventories, selectedRecipientInventoryId]);

	const filteredRecipientInventories = useMemo(() => {
		return inventories.filter((inventory) => inventory.id !== selectedSenderInventoryId);
	}, [inventories, selectedSenderInventoryId]);

	const handleSenderInventoryChange = useCallback(
		(
			value: string,
			setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
		) => {
			setFieldValue("SenderInventoryId", value);
			setSelectedSenderInventoryId(Number(value));

			if (selectedProductId) calculateProductQuantities(selectedProductId, Number(value));
		},
		[selectedProductId, calculateProductQuantities]
	);

	const handleRecipientInventoryChange = useCallback(
		(
			value: string,
			setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
		) => {
			setFieldValue("RecipientInventoryId", value);
			setSelectedRecipientInventoryId(Number(value));

			if (selectedProductId) calculateProductQuantities(selectedProductId, Number(value));
		},
		[selectedProductId, calculateProductQuantities]
	);

	const handleProductChange = useCallback(
		(
			value: string,
			setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
		) => {
			const selectedProduct = products.find((product) => product.id === Number(value));
			const isPerishable = selectedProduct ? selectedProduct.perishable : false;

			setFieldValue("ProductId", value);
			setSelectedProductId(Number(value));

			if (!isPerishable) setFieldValue("ExpiryDate", null);

			if (selectedSenderInventoryId)
				calculateProductQuantities(Number(value), selectedSenderInventoryId);

			if (selectedRecipientInventoryId)
				calculateProductQuantities(Number(value), selectedRecipientInventoryId);
		},
		[products, selectedSenderInventoryId, selectedRecipientInventoryId, calculateProductQuantities]
	);

	const handleConfirm = useCallback(async () => {
		if (reallocationDataRef.current) {
			try {
				await reallocateBatch(reallocationDataRef.current);
				navigate("/batches");
			} catch (error: any) {
				setErrorMessage(parseErrorMessage(error));
			} finally {
				onClose();
			}
		}
	}, [navigate, onClose]);

	const onSubmit = useCallback(
		async (values: IReallocateBatch, { setSubmitting }: any) => {
			reallocationDataRef.current = values;
			try {
				const avaliableQuantitySenderInventory = productQuantities[values.SenderInventoryId] || 0;
				const avaliableQuantityRecipientInventory =
					productQuantities[values.RecipientInventoryId] || 0;

				const isParametersViolatedForSenderInventory = await IsParametersViolated(
					NoteTypeEnum.EXIT,
					values.ProductId,
					values.SenderInventoryId,
					values.Quantity,
					avaliableQuantitySenderInventory
				);

				const isParametersViolatedForRecipientInventory = await IsParametersViolated(
					NoteTypeEnum.ENTRY,
					values.ProductId,
					values.RecipientInventoryId,
					values.Quantity,
					avaliableQuantityRecipientInventory
				);

				if (isParametersViolatedForRecipientInventory)
					setModalMessage(
						"Do you really want to exceed the product limits for recipient inventory?"
					);

				if (isParametersViolatedForSenderInventory)
					setModalMessage("Do you really want to exceed the product limits for sender inventory?");

				if (isParametersViolatedForRecipientInventory || isParametersViolatedForSenderInventory) {
					onOpen();
				} else {
					handleConfirm();
				}
			} catch (error: any) {
				setErrorMessage(parseErrorMessage(error));
			} finally {
				setSubmitting(false);
			}
		},
		[productQuantities, handleConfirm, onOpen, setErrorMessage]
	);

	const reallocationSchema = Yup.object().shape({
		ExpiryDate: Yup.date().nullable(),
		Price: Yup.number().positive("Price must be positive.").required("Price is required."),
		Quantity: Yup.number().positive("Quantity must be positive.").required("Quantity is required."),
		ProductId: Yup.string().required("Product is required."),
		SenderInventoryId: Yup.string().required("Sender inventory is required."),
		RecipientInventoryId: Yup.string().required("Recipient inventory is required."),
	});

	return {
		products,
		errorMessage,
		reallocationSchema,
		selectedProductId,
		selectedRecipientInventoryId,
		selectedSenderInventoryId,
		isOpen,
		productQuantities,
		modalMessage,
		fetchErrorMessage,
		filteredSenderInventories,
		filteredRecipientInventories,
		handleConfirm,
		onClose,
		setErrorMessage,
		onSubmit,
		handleProductChange,
		handleRecipientInventoryChange,
		handleSenderInventoryChange,
	};
}