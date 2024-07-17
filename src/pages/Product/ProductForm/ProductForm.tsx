import { Box, Button, FormControl, FormLabel, Input, Switch } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Select, { CSSObjectWithLabel } from "react-select";
import "./ProductForm.css";
import { useEffect, useState } from "react";
import { getAllSubcategories } from "../../../services/SubcategoryService";
import IListSubcategory from "../../../lib/interfaces/subcategory/IListSubcategory";
import { ICreateProduct } from "../../../lib/interfaces/product/ICreateProduct";
import { CreateProductService } from "../../../services/ProductService";
import { useNavigate } from "react-router-dom";
import parseErrorMessage from "../../../utils/ParseErrorMessage";
import { ErrorAlert } from "../../../components/ErrorAlert/ErrorAlert";
import { CategoriesEnum } from "../../../lib/enums/CategoryEnum";

export function ProductForm() {
	const navigate = useNavigate();
	const [subcategories, setSubcategories] = useState<{value: number, label: string}[]>([])
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [data, setData] = useState<IListSubcategory[]>();

	useEffect(() => {
        const fetchData = async () => {
            try {
                const pagedSubcategories = await getAllSubcategories(0,999);
                setData(pagedSubcategories.records);
            } catch (error: any) {
				setErrorMessage(parseErrorMessage(error));
            }
        };

        fetchData();
    }, []); 

	useEffect(() => {
		if (data) {
			const updatedSubcategories = data.map(subCategories => ({ value: subCategories.id, label: subCategories.name }));
			setSubcategories(updatedSubcategories);
		}
	}, [data])

	const categories = CategoriesEnum; 

	const ProductSchema = Yup.object().shape({
		name: Yup.string().required("Name is required.")
		.max(100, "Name must be 100 characters or less."),
		category: Yup.number().required("Category is required."),
		subcategories: Yup.array().of(Yup.string()),
	});

	const selectStyles = {
		control: (base: CSSObjectWithLabel, state: any) => ({
			...base,
			borderColor: state.isFocused ? "rgba(102, 179, 186, 0.5)" : base.borderColor,
			"&:hover": {
				borderColor: state.isFocused ? "rgba(102, 179, 186, 0.5)" : base.borderColor,
			},
			boxShadow: state.isFocused ? "0 0 0 1px rgba(102, 179, 186, 0.5)" : "none",
		}),
		option: (base: CSSObjectWithLabel, state: any) => ({
			...base,
			backgroundColor: state.isSelected
				? "rgba(102, 179, 186, 0.5)"
				: state.isFocused
				? "rgba(102, 179, 186, 0.5)"
				: "white",
			color: "black",
			"&:hover": {
				backgroundColor: "rgba(102, 179, 186, 0.5)",
				color: "black",
			},
		}),
	};

	return (
		<Formik
			initialValues={{ name: "", category: 0, perishable: false, subcategories: [] }}
			validationSchema={ProductSchema}
			onSubmit={async (values, actions) => {
				try{
					const productData: ICreateProduct = {
						name: values.name,
						category: values.category,
						perishable: values.perishable,
						subCategories: values.subcategories
					}
					await CreateProductService(productData);
					navigate("/products")
				}
				catch (error: any) {
					setErrorMessage(parseErrorMessage(error));
				} finally {
					actions.setSubmitting(false);
				}
			}}
		>
			{({ errors, touched, isSubmitting, setFieldValue }) => (
				<Form>
					<Box>
						<FormControl isInvalid={!!errors.name && touched.name} className="product-form-control">
							<FormLabel htmlFor="name">Name</FormLabel>
							<Field as={Input} id="name" focusBorderColor="#66B3BA" name="name" />
							{errors.name && touched.name ? <Box color="red.500">{errors.name}</Box> : null}
						</FormControl>

						<FormControl isInvalid={!!errors.category && touched.category} className="product-form-control">
							<FormLabel htmlFor="category">Category</FormLabel>

							<Select
								styles={selectStyles}
								className="select"
								id="category"
								name="category"
								options={categories}
								classNamePrefix="select"
								onChange={(selectedOption) =>
									setFieldValue("category", selectedOption ? selectedOption.value : "")
								}
							/>
							{errors.category && touched.category ? (
								<Box color="red.500">{errors.category}</Box>
							) : null}
						</FormControl>

						<FormControl className="product-form-control">
							<FormLabel htmlFor="perishable">Perishable</FormLabel>
							<Field className="field" as={Switch} id="perishable" name="perishable" />
						</FormControl>

						<FormControl className="product-form-control">
							<FormLabel htmlFor="subcategories">SubCategories</FormLabel>
							<Select
								styles={selectStyles}
								className="select-subcategories"
								id="subcategories"
								name="subcategories"
								options={subcategories}
								isMulti
								classNamePrefix="select"
								menuPlacement="auto"
								menuPortalTarget={document.body}
								onChange={(selectedOptions) =>
									setFieldValue(
										"subcategories",
										selectedOptions.map((option) => option.value)
									)
								}
							/>
						</FormControl>
					</Box>
					{errorMessage && (
						<Box mt={4}>
							<ErrorAlert errorMessage={errorMessage} />
						</Box>
					)}
					<Box m={6} className="button-box">
						<Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
							Save
						</Button>
					</Box>
				</Form>
			)}
		</Formik>
	);
}
