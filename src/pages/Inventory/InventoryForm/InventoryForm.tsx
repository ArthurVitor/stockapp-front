import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "./InventoryForm.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ICreateInventory from "../../../lib/interfaces/inventory/ICreateInventory";
import { createInventory } from "../../../services/InventoryService";
import { ErrorAlert } from "../../../components/ErrorAlert/ErrorAlert";
import parseErrorMessage from "../../../utils/ParseErrorMessage";

export function InventoryForm() {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const inventoryScheme = Yup.object().shape({
		name: Yup.string().required("Name is required.")
		.max(100, "Name must be 100 characters or less."),
	});

	return (
		<Formik
			initialValues={{ name: "" }}
			validationSchema={inventoryScheme}
			onSubmit={async (values, actions) => {
				try {
					const newInventory: ICreateInventory = {
						name: values.name,
					};
					await createInventory(newInventory);
					navigate("/inventories");
				} catch (error: any) {
					setErrorMessage(parseErrorMessage(error));
				} finally {
					actions.setSubmitting(false);
				}
			}}
		>
			{({ errors, touched, isSubmitting, setFieldValue }) => (
				<Form>
					<Box>
						<FormControl isInvalid={!!errors.name && touched.name}>
							<FormLabel htmlFor="name">Name</FormLabel>
							<Field as={Input} id="name" focusBorderColor="#66B3BA" name="name" />
							{errors.name && touched.name ? <Box color="red.500">{errors.name}</Box> : null}
						</FormControl>
					</Box>
					{errorMessage && (
						<Box mt={4}>
							<ErrorAlert errorMessage={errorMessage} />
						</Box>
					)}
					<Box m={4} className="button-box">
						<Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
							Save
						</Button>
					</Box>
				</Form>
			)}
		</Formik>
	);
}