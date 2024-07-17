import { Formik, Form } from "formik";
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
import "./ReallocateBatchForm.css";
import { useReallocateBatchForm } from "../../../hooks/useReallocateBatchForm";

export function ReallocateBatchForm() {
	const {
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
		onSubmit,
		handleProductChange,
		handleRecipientInventoryChange,
		handleSenderInventoryChange,
	} = useReallocateBatchForm();

	return (
		<Formik
			initialValues={{
				ExpiryDate: "",
				Price: 0,
				Quantity: 0,
				ProductId: 0,
				SenderInventoryId: 0,
				RecipientInventoryId: 0,
			}}
			validationSchema={reallocationSchema}
			onSubmit={onSubmit}
		>
			{({ errors, touched, isSubmitting, handleChange, handleBlur, values, setFieldValue }) => (
				<Form>
					<Grid templateColumns="50% 50%" gap={10}>
						<GridItem>
							<FormControl
								isInvalid={!!(errors.ProductId && touched.ProductId)}
								className="reallocate-form-control"
							>
								<FormLabel htmlFor="Product">Product</FormLabel>
								<Select
									id="Product"
									name="Product"
									value={values.ProductId}
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
								<FormErrorMessage m={1}>{errors.ProductId}</FormErrorMessage>
							</FormControl>

							<FormControl
								isInvalid={!!(errors.Price && touched.Price)}
								className="reallocate-form-control"
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
								isInvalid={!!(errors.SenderInventoryId && touched.SenderInventoryId)}
								className="reallocate-form-control"
							>
								<FormLabel htmlFor="SenderInventory">Sender Inventory</FormLabel>
								<Select
									onChange={(e) => handleSenderInventoryChange(e.target.value, setFieldValue)}
									id="SenderInventory"
									name="SenderInventory"
									value={values.SenderInventoryId}
									onBlur={handleBlur}
								>
									<option value="" label="Choose sender Inventory" />
									{filteredSenderInventories.map((inventory) => (
										<option key={inventory.id} value={inventory.id}>
											{inventory.name}
										</option>
									))}
								</Select>
								{selectedProductId && selectedSenderInventoryId && (
									<Box m={1} color="gray.500">
										This inventory has {productQuantities[selectedSenderInventoryId]} units of
										product '{products.find((product) => product.id === selectedProductId)?.name}'
									</Box>
								)}
								<FormErrorMessage margin={1}>{errors.SenderInventoryId}</FormErrorMessage>
							</FormControl>
						</GridItem>

						<GridItem>
							<FormControl
								isInvalid={!!(errors.Quantity && touched.Quantity)}
								className="reallocate-form-control"
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
								className="reallocate-form-control"
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
										!products.find((product) => product.id === Number(values.ProductId))?.perishable
									}
								/>
								<FormErrorMessage m={1}>{errors.ExpiryDate}</FormErrorMessage>
							</FormControl>

							<FormControl
								isInvalid={!!(errors.RecipientInventoryId && touched.RecipientInventoryId)}
								className="reallocate-form-control"
							>
								<FormLabel htmlFor="RecipientInventory">Recipient Inventory</FormLabel>
								<Select
									onChange={(e) => handleRecipientInventoryChange(e.target.value, setFieldValue)}
									id="RecipientInventory"
									name="RecipientInventory"
									value={values.RecipientInventoryId}
									onBlur={handleBlur}
								>
									<option value="" label="Choose recipient Inventory" />
									{filteredRecipientInventories.map((inventory) => (
										<option key={inventory.id} value={inventory.id}>
											{inventory.name}
										</option>
									))}
								</Select>
								{selectedProductId && selectedRecipientInventoryId && (
									<Box m={1} color="gray.500">
										This inventory has {productQuantities[selectedRecipientInventoryId]} units of
										product '{products.find((product) => product.id === selectedProductId)?.name}'
									</Box>
								)}
								<FormErrorMessage margin={1}>{errors.RecipientInventoryId}</FormErrorMessage>
							</FormControl>
						</GridItem>
					</Grid>
					{fetchErrorMessage || errorMessage ? (
						<Box m={4}>
							<ErrorAlert errorMessage={fetchErrorMessage ?? errorMessage} />
						</Box>
					) : null}
					<Box className="button-box">
						<Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
							Reallocate Batch
						</Button>
					</Box>
					<ConfirmationModal
						isOpen={isOpen}
						onClose={onClose}
						onConfirm={handleConfirm}
						message={modalMessage}
						title={"Confirm Exceeding Limits"}
					/>
				</Form>
			)}
		</Formik>
	);
}
