import { Box, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { ErrorAlert } from "../../../components/ErrorAlert/ErrorAlert";
import "./subcategoriesimporting.css"
import { ImportSubCategoriesService } from "../../../services/FileImportingService";
import { IOutletContextType } from "../../../lib/interfaces/header/IOutletContextType";

export function SubCategoriesImporting() {
  const navigate = useNavigate();
  const [errorMessage] = useState<string | null>(null);
  const { setPagina, setActivatedTag } = useOutletContext<IOutletContextType>();

  useEffect(() => {
      setPagina("subCategories")
      setActivatedTag("importSubCategories")
  })
  

  interface MyFormValues {
    file: File | null;
  }
  
  const initialValues: MyFormValues = {
    file: null,
  };
  const inventoryScheme = Yup.object().shape({
    file: Yup.mixed().required("File is required."),
  });

  const handleSubmit = async (values: MyFormValues) => {
    if(values.file){
      const formData = new FormData();
      formData.append("file", values.file)

      try {
        await ImportSubCategoriesService(formData);
        navigate("/sub-categories/")
      }
      catch(erro){
        console.log(erro)
      }
    }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="75vh" bgColor={"#Fff"} borderRadius={20} margin="1%">
      <Box p={3} w="50%" maxW="80%" minW="60%">
        <Formik initialValues={initialValues} validationSchema={inventoryScheme} onSubmit={handleSubmit}>
          {({ errors, touched, isSubmitting, setFieldValue }) => (
            <Form>
              <Box>
                <FormControl isInvalid={!!errors.file && touched.file}>
                  <FormLabel htmlFor="file">File</FormLabel>
                  <input id="file" name="file" type="file" className="file-input" onChange={(event) => {setFieldValue("file", event.currentTarget.files![0])}}/>
                  {errors.file && touched.file ? (
                    <Box color="red.500">{errors.file}</Box>
                  ) : null}
                </FormControl>
              </Box>
              {errorMessage && (
                <Box mt={4}>
                  <ErrorAlert errorMessage={errorMessage} />
                </Box>
              )}
              <Box className="button-box">
                <Button type="submit" colorScheme="teal" mt={2} isLoading={isSubmitting}>
                  Save
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
