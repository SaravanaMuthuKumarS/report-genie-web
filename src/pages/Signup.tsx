import { useContext } from "react";
import Select from "react-select";
import { AuthContext } from "../context/AuthContextProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../components/Button";
import { boolean, object, string } from "yup";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, dummyProjects } from "../constants/appConstants";
import { AuthContextType } from "../types/appTypes";

const SignupValidation = object({
  fullName: string()
    .required("Full Name is required")
    .matches(/^[a-zA-Z\s]+$/, "Full Name must contain only letters and spaces"),
  mailId: string().email("Invalid Email Provided").required("Email is required"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  isFinance: boolean()
    .required("Finance status is required")
    .oneOf([true, false], "Finance status must be true or false"),
});

export default function SignIn() {
  const { isRetry, handleSignup } = useContext<AuthContextType>(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans bg-cover bg-center bg-[url('../src/assets/images/login.png')]">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Welcome to iAssistant!
        </h2>
        <h3 className="text-lg text-center font-medium text-gray-600 mb-5">
          Sign Up
        </h3>
        <Formik
          initialValues={{
            fullName: "",
            password: "",
            mailId: "",
            projects: [] as { id: string }[],
            isFinance: false,
          }}
          validationSchema={SignupValidation}
          onSubmit={(values, { setSubmitting }) => {
            handleSignup({
              fullName: values.fullName,
              password: values.password,
              mailId: values.mailId,
              projects: values.projects,
              isFinance: values.isFinance,
            });
            setSubmitting(false);
          }}
        >
          {() => (
            <Form>
              <div className="flex gap-6 justify-between">
                {/* Left Side Fields */}
                <div className="flex flex-col w-full sm:w-1/2 space-y-6">
                  {/* Full Name */}
                  <div className="flex flex-col">
                    <label htmlFor="fullName" className="text-sm font-medium text-gray-600">
                      Full Name
                    </label>
                    <Field
                      className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      type="text"
                      name="fullName"
                      id="fullName"
                      placeholder="Enter your full name"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="text-xs text-red-500 mt-1"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <label htmlFor="mailId" className="text-sm font-medium text-gray-600">
                      Email
                    </label>
                    <Field
                      className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      type="email"
                      name="mailId"
                      id="mailId"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage
                      name="mailId"
                      component="div"
                      className="text-xs text-red-500 mt-1"
                    />
                  </div>

                  {/* Password */}
                  <div className="flex flex-col">
                    <label htmlFor="password" className="text-sm font-medium text-gray-600">
                      Password
                    </label>
                    <Field
                      className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-xs text-red-500 mt-1"
                    />
                  </div>
                </div>

                {/* Right Side Fields */}
                <div className="flex flex-col w-full sm:w-1/2 space-y-6">
                  {/* Projects */}
                  <div className="flex flex-col">
                    <label htmlFor="setOfProjects" className="text-sm font-medium text-gray-600">
                      Projects
                    </label>
                    <Field name="setOfProjects">
                      {({ field, form }: any) => (
                        <Select
                          isMulti
                          options={dummyProjects.map((project) => ({
                            value: project.id,
                            label: project.name,
                          }))}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          name={field.name}
                          id="projects"
                          value={field.value?.map((selectedProject: { id: string }) => ({
                            value: selectedProject.id,
                            label:
                              dummyProjects.find((p) => p.id === selectedProject.id)?.name || "",
                          }))}
                          onChange={(selectedOptions) => {
                            const selectedValues = selectedOptions.map((option: { value: string }) => ({
                              id: option.value,
                            }));
                            form.setFieldValue(field.name, selectedValues);
                          }}
                        />
                      )}
                    </Field>
                  </div>

                  {/* Finance Checkbox */}
                  <div className="flex items-center gap-2">
                    <Field
                      className="w-4 h-4 rounded focus:ring-2 focus:ring-blue-400"
                      type="checkbox"
                      name="isFinance"
                      id="isFinance"
                    />
                    <label htmlFor="isFinance" className="text-sm font-medium text-gray-600">
                      Is Finance
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6 w-full flex justify-center">
                <Button title="Sign Up" />
              </div>

              {/* Retry Error */}
              {isRetry && (
                <p className="text-xs text-red-500 text-center mt-2 w-full">
                  Invalid credentials, please try again!
                </p>
              )}
            </Form>
          )}
        </Formik>

        {/* Login Redirect */}
        <div className="flex justify-center mt-6">
          <p className="text-xs text-gray-600">Already have an account?</p>
          <button
            onClick={() => navigate(LOGIN_ROUTE)}
            className="ml-2 text-xs font-medium text-blue-600 hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
