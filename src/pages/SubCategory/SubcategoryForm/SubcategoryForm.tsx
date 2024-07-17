import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./SubcategoryForm.css";
import { createSubcategory } from "../../../services/SubcategoryService";
import { useState } from "react";
import { ErrorAlert } from "../../../components/ErrorAlert/ErrorAlert";
import ICreateSubcategory from "../../../lib/interfaces/subcategory/ICreateSubcategory";
import parseErrorMessage from "../../../utils/ParseErrorMessage";

export function SubcategoryForm() {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const subcategoryScheme = Yup.object().shape({
		name: Yup.string().required("Name is required.")
		.max(100, "Name must be 100 characters or less."),
	});

	return (
		<Formik
			initialValues={{ name: "" }}
			validationSchema={subcategoryScheme}
			onSubmit={async (values, actions) => {
				try {
					const newSubcategory: ICreateSubcategory = {
						name: values.name,
					};
					await createSubcategory(newSubcategory);
					navigate("/subcategories");
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
							{errors.name && touched.name ? <Box m={0} color="red.500">{errors.name}</Box> : null}
						</FormControl>
					</Box>
					{errorMessage && (
						<Box m={4}>
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
