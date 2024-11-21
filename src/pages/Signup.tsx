import { useContext } from "react";
import Select from "react-select";
import { AuthContext, AuthContextType } from "../context/AuthContextProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../components/Button";
import { array, boolean, object, string } from "yup";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../constants/appConstants";

const SignupValidation = object({
  fullName: string()
    .required("Full Name is required")
    .matches(/^[a-zA-Z\s]+$/, "Full Name must contain only letters and spaces"),
  mailId: string()
    .email("Invalid Email Provided")
    .required("Email is required"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  setOfProjects: array()
    .of(string())
    .required("At least one project must be selected"),
  isFinance: boolean()
    .required("Finance status is required")
    .oneOf([true, false], "Finance status must be true or false"),
});

export default function SignIn() {
  const { isRetry, handleSignup } = useContext<AuthContextType>(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 w-screen h-screen flex flex-col items-center justify-center font-mono bg-[url('../src/assets/images/login.png')]">
      <p className="text-white font-bold text-4xl mb-8">Welcome to iAssistant!</p>
      <div className="bg-gray-200 rounded-lg shadow-md px-10 pt-6">
        <h3 className="text-lg text-center font-bold mb-4">SignUp New User !</h3>
        <Formik
          initialValues={{ fullName: "", password: "", mailId: "", setOfProjects: [], isFinance: false }}
          validationSchema={SignupValidation}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values.setOfProjects);
            handleSignup();
            setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-2">
                  <label htmlFor="fullName">Full Name:</label>
                  <Field
                    className="px-2 rounded"
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Enter Your Full Name"
                  />
                  {errors.fullName && touched.fullName && (
                    <ErrorMessage name="fullName" component="div" className="text-red-500" />
                  )}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <label htmlFor="mailId">Mail ID:</label>
                  <Field
                    className="px-2 rounded"
                    type="email"
                    name="mailId"
                    id="mailId"
                    placeholder="Enter Your Email"
                  />
                  {errors.mailId && touched.mailId && (
                    <ErrorMessage name="mailId" component="div" className="text-red-500" />
                  )}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <label htmlFor="password">Password:</label>
                  <Field
                    className="px-2 rounded"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                  />
                  {errors.password && touched.password && (
                    <ErrorMessage name="password" component="div" className="text-red-500" />
                  )}
                </div>

                <div className="flex items-center justify-between w-96 gap-2">
                  <label htmlFor="setOfProjects">Set of Projects:</label>
                  <Field
                    name="setOfProjects"
                  >
                    {({ field, form }: any) => (
                      <Select
                        isMulti
                        options={[
                          { value: "project1", label: "Project 1" },
                          { value: "project2", label: "Project 2" },
                          { value: "project3", label: "Project 3" },
                          { value: "project4", label: "Project 4" },
                          { value: "project5", label: "Project 5" },
                          { value: "project6", label: "Project 6" },
                          { value: "project7", label: "Project 7" },
                          { value: "project8", label: "Project 8" },
                        ]}
                        className="px-2 rounded"
                        name={field.name}
                        id="setOfProjects"
                        value={field.value.map((val: any) => ({
                          value: val,
                          label: `Project ${val.slice(-1)}`,
                        }))}
                        onChange={(selectedOptions) => {
                          const selectedValues = selectedOptions.map((option) => option.value);
                          form.setFieldValue(field.name, selectedValues);
                        }}
                        styles={{
                          valueContainer: (provided) => ({
                            ...provided,
                            maxHeight: "80px",
                            overflowY: "auto",
                          }),
                        }}
                      />
                    )}
                  </Field>
                  {errors.setOfProjects && touched.setOfProjects && (
                    <ErrorMessage name="setOfProjects" component="div" className="text-red-500" />
                  )}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <label htmlFor="isFinance">Is Finance:</label>
                  <Field
                    className="pt-2 rounded w-5 h-5"
                    type="checkbox"
                    name="isFinance"
                    id="isFinance"
                  />
                  {errors.isFinance && touched.isFinance && (
                    <ErrorMessage name="isFinance" component="div" className="text-red-500" />
                  )}
                </div>

                <div className="flex items-center justify-center cursor-pointer mt-1">
                  <Button title="Submit" />
                </div>

                {isRetry && (
                  <p className="text-red-500 text-center mt-2">Wrong Credentials, Retry!</p>
                )}
              </div>
            </Form>
          )}
        </Formik>
        <div className="flex items-center justify-around gap-4 mb-4">
          <p className="text-lg mt-3 text-black">
            Already a User ?
          </p>
          <Button title="Login" click={() => navigate(LOGIN_ROUTE)} />
        </div>
      </div>
    </div>
  );
}
