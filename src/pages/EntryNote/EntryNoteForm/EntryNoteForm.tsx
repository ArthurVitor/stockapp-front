import { Form, Formik } from "formik";
import "./EntryNoteForm.css";
import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	GridItem,
	Input,
	NumberInput,
	NumberInputField,
	Select,
} from "@chakra-ui/react";
import { ErrorAlert } from "../../../components/ErrorAlert/ErrorAlert";
import { ConfirmationModal } from "../../../components/ConfirmationModal/ConfirmationModal";
import { useEntryNoteForm } from "../../../hooks/useEntryNoteForm";

export function EntryNoteForm() {
	const {
		products,
		inventories,
		selectedProductId,
		selectedInventoryId,
		errorMessage,
		fetchErrorMessage,
		isOpen,
		entryNoteSchema,
		productQuantities,
		onClose,
		handleProductChange,
		handleInventoryChange,
		handleSubmit,
		handleConfirm,
	} = useEntryNoteForm();

	return (
		<Formik
			initialValues={{
				ExpiryDate: "",
				Price: 0,
				Quantity: 0,
				Product: 0,
				Inventory: 0,
			}}
			validationSchema={entryNoteSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, touched, isSubmitting, handleChange, handleBlur, values, setFieldValue }) => (
				<Form>
					<Grid templateColumns="50% 50%" gap={8}>
						<GridItem>
							<FormControl
								isInvalid={!!(errors.Price && touched.Price)}
								className="note-form-control"
							>
								<FormLabel htmlFor="Price">Price</FormLabel>
								<NumberInput precision={2} step={0.01} min={0}>
									<NumberInputField
										id="Price"
										name="Price"
										value={values.Price}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</NumberInput>
								<FormErrorMessage margin={1}>{errors.Price}</FormErrorMessage>
							</FormControl>

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
								isInvalid={!!(errors.ExpiryDate && touched.ExpiryDate)}
								className="note-form-control"
							>
								<FormLabel htmlFor="ExpiryDate">Expiration Date</FormLabel>
								<Input
									type="datetime-local"
									id="ExpiryDate"
									name="ExpiryDate"
									value={values.ExpiryDate || ""}
									onChange={handleChange}
									onBlur={handleBlur}
									isDisabled={
										!products.find((product) => product.id === Number(values.Product))?.perishable
									}
								/>
								<FormErrorMessage m={1}>{errors.ExpiryDate}</FormErrorMessage>
							</FormControl>
						</GridItem>

						<GridItem>
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
									onChange={(e) => handleInventoryChange(e.target.value, setFieldValue)}
									id="Inventory"
									name="Inventory"
									value={values.Inventory}
									onBlur={handleBlur}
								>
									<option value="" label="Choose an Inventory" />
									{inventories.map((inventory) => (
										<option key={inventory.id} value={inventory.id}>
											{inventory.name}
										</option>
									))}
								</Select>
								<FormErrorMessage margin={1}>{errors.Inventory}</FormErrorMessage>
								{selectedProductId && selectedInventoryId && (
									<Box mt={2} m={2} color="gray.500">
										This inventory has {productQuantities[selectedInventoryId] || 0} units of
										product '{products.find((product) => product.id === selectedProductId)?.name}'
									</Box>
								)}
							</FormControl>
						</GridItem>
					</Grid>
					{fetchErrorMessage || errorMessage ? (
						<Box m={4}>
							<ErrorAlert errorMessage={fetchErrorMessage ?? errorMessage} />
						</Box>
					) : null}
					<Box m={5} className="button-box">
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