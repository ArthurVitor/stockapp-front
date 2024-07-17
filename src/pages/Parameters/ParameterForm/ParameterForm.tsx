import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	GridItem,
	NumberInput,
	NumberInputField,
	Select,
} from "@chakra-ui/react";
import "./ParameterForm.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ErrorAlert } from "../../../components/ErrorAlert/ErrorAlert";
import { GetAllProducts } from "../../../services/ProductService";
import { getAllInventories } from "../../../services/InventoryService";
import ICreateParameters from "../../../lib/interfaces/parameters/ICreateParameters";
import { createParameters } from "../../../services/ParametersService";
import parseErrorMessage from "../../../utils/ParseErrorMessage";
import IListInventory from "../../../lib/interfaces/inventory/IListInventory";
import { IListProduct } from "../../../lib/interfaces/product/IListProduct";

export function ParameterForm() {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [products, setProducts] = useState<IListProduct[]>([]);
	const [inventories, setInventories] = useState<IListInventory[]>([]);

	useEffect(() => {
		const fetchProductsAndInventories = async () => {
			try {
				const [fetchedProducts, fetchedInventories] = await Promise.all([
					GetAllProducts(0,9999), //needs proper pagination
					getAllInventories(0,9999, "id", true),
				]);
				setProducts(fetchedProducts.records);
				setInventories(fetchedInventories.records);
			} catch (error: any) {
				setErrorMessage(parseErrorMessage(error));
			}
		};

		fetchProductsAndInventories();
	}, []);

	const entryNoteSchema = Yup.object().shape({
		MaximumAmount: Yup.number()
			.positive("Maximum amount must be positive.")
			.required("Maximum amount is required."),
		MinimumAmout: Yup.number()
			.positive("Minimum amount must be positive.")
			.required("Minimum amount is required."),
		Product: Yup.string().required("Product is required."),
		Inventory: Yup.string().required("Inventory is required."),
	});

	return (
		<Formik
			initialValues={{
				MaximumAmount: "",
				MinimumAmout: "",
				Product: "",
				Inventory: "",
			}}
			validationSchema={entryNoteSchema}
			onSubmit={async (values, actions) => {
				try {
					const newParameters: ICreateParameters = {
						productId: Number(values.Product),
						inventoryId: Number(values.Inventory),
						maximumAmount: Number(values.MaximumAmount),
						minimumAmount: Number(values.MinimumAmout),
					};
					await createParameters(newParameters);
					navigate("/parameters");
				} catch (error: any) {
					setErrorMessage(parseErrorMessage(error));
				} finally {
					actions.setSubmitting(false);
				}
			}}
		>
			{({ errors, touched, isSubmitting, handleChange, handleBlur, values }) => {
				return (
					<Form>
						<Grid templateColumns="50% 50%" gap={8}>
							<GridItem>
								<FormControl
									isInvalid={!!(errors.MaximumAmount && touched.MaximumAmount)}
									className="parameter-form-control"
								>
									<FormLabel htmlFor="Price">Maximum amount</FormLabel>
									<NumberInput precision={2} step={0.01} min={0}>
										<NumberInputField
											id="MaximumAmount"
											name="MaximumAmount"
											value={values.MaximumAmount}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									</NumberInput>
									<FormErrorMessage margin={1}>{errors.MaximumAmount}</FormErrorMessage>
								</FormControl>

								<FormControl
									isInvalid={!!(errors.MinimumAmout && touched.MinimumAmout)}
									className="parameter-form-control"
								>
									<FormLabel htmlFor="Quantity">Minimum amout</FormLabel>
									<NumberInput precision={2} step={0.01} min={0}>
										<NumberInputField
											id="MinimumAmout"
											name="MinimumAmout"
											value={values.MinimumAmout}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									</NumberInput>
									<FormErrorMessage m={1}>{errors.MinimumAmout}</FormErrorMessage>
								</FormControl>
							</GridItem>

							<GridItem>
								<FormControl
									isInvalid={!!(errors.Product && touched.Product)}
									className="parameter-form-control"
								>
									<FormLabel htmlFor="Product">Product</FormLabel>
									<Select
										id="Product"
										name="Product"
										value={values.Product}
										onChange={handleChange}
										onBlur={handleBlur}
									>
										<option value="" label="Select a product" />
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
									className="parameter-form-control"
								>
									<FormLabel htmlFor="InventoryId">Inventory</FormLabel>
									<Select
										id="Inventory"
										name="Inventory"
										value={values.Inventory}
										onChange={handleChange}
										onBlur={handleBlur}
									>
										<option value="" label="Select a inventory" />
										{inventories.map((inventory) => (
											<option key={inventory.id} value={inventory.id}>
												{inventory.name}
											</option>
										))}
									</Select>
									<FormErrorMessage margin={1}>{errors.Inventory}</FormErrorMessage>
								</FormControl>
							</GridItem>
						</Grid>
						{errorMessage && (
							<Box mt={4}>
								<ErrorAlert errorMessage={errorMessage} />
							</Box>
						)}
						<Box className="button-box">
							<Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
								Save
							</Button>
						</Box>
					</Form>
				);
			}}
		</Formik>
	);
}
