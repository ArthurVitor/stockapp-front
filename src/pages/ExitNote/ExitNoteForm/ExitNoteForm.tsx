import { Form, Formik } from "formik";
import "./ExitNoteForm.css";
import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	NumberInput,
	NumberInputField,
	Select,
} from "@chakra-ui/react";
import { ErrorAlert } from "../../../components/ErrorAlert/ErrorAlert";
import { ConfirmationModal } from "../../../components/ConfirmationModal/ConfirmationModal";
import { useExitNoteForm } from "../../../hooks/useExitNoteForm";

export function ExitNoteForm() {
const {
		products,
		inventories,
		errorMessage,
		isOpen,
		selectedProductId,
		selectedInventoryId,
		productQuantities,
		exitNoteSchema,
		fetchErrorMessage,
		onClose,
		handleProductChange,
		handleInventoryChange,
		handleSubmit,
		handleConfirm,
	} = useExitNoteForm();

	return (
		<Formik
			initialValues={{
				Quantity: "",
				Product: "",
				Inventory: "",
			}}
			validationSchema={exitNoteSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, touched, isSubmitting, handleChange, handleBlur, values, setFieldValue }) => (
				<Form>
					<FormControl
						isInvalid={!!(errors.Quantity && touched.Quantity)}
						className="note-form-control"
					>
						<FormLabel htmlFor="Quantity">Quantity</FormLabel>
						<NumberInput precision={2} step={0.01} min={0}>
							<NumberInputField
								id="Quantity"
								name="Quantity"
								value={values.Quantity}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</NumberInput>
						<FormErrorMessage m={1}>{errors.Quantity}</FormErrorMessage>
					</FormControl>

					<FormControl
						isInvalid={!!(errors.Product && touched.Product)}
						className="note-form-control"
					>
						<FormLabel htmlFor="Product">Product</FormLabel>
						<Select
							id="Product"
							name="Product"
							value={values.Product}
							onChange={(e) => handleProductChange(e.target.value, setFieldValue)}
							onBlur={handleBlur}
						>
							<option value="" label="Select a Product" />
							{products.map((product) => (
								<option key={product.id} value={product.id}>
									{product.name}
								</option>
							))}
						</Select>
						<FormErrorMessage m={1}>{errors.Product}</FormErrorMessage>
					</FormControl>

					<FormControl
						isInvalid={!!(errors.Inventory && touched.Inventory)}
						className="note-form-control"
					>
						<FormLabel htmlFor="InventoryId">Inventory</FormLabel>
						<Select
							id="Inventory"
							name="Inventory"
							value={values.Inventory}
							onChange={(e) => handleInventoryChange(e.target.value, setFieldValue)}
							onBlur={handleBlur}
						>
							<option value="" label="Select a Inventory" />
							{inventories.map((inventory) => (
								<option key={inventory.id} value={inventory.id}>
									{inventory.name}
								</option>
							))}
						</Select>
						<FormErrorMessage margin={1}>{errors.Inventory}</FormErrorMessage>
					</FormControl>
					{selectedProductId && selectedInventoryId && (
						<Box ml={5} mt={3} color="gray.500">
							This inventory has {productQuantities[selectedInventoryId] || 0} units of product '
							{products.find((product) => product.id === selectedProductId)?.name}'
						</Box>
					)}
					{fetchErrorMessage || errorMessage ? (
						<Box m={4}>
							<ErrorAlert errorMessage={fetchErrorMessage ?? errorMessage} />
						</Box>
					) : null}
					<Box m={6} className="button-box">
						<Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
							Save
						</Button>
					</Box>
					<ConfirmationModal
						isOpen={isOpen}
						onClose={onClose}
						onConfirm={handleConfirm}
						message={"Do you really want to exceed the product limits?"}
						title={"Confirm Exceeding Limits"}
					/>
				</Form>
			)}
		</Formik>
	);
}
