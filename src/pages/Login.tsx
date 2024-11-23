import { useContext } from "react";
import { AuthContext, AuthContextType } from "../context/AuthContextProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../components/Button";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";
import { SIGNUP_ROUTE } from "../constants/appConstants";
import logo from "../../src/assets/images/logo.png";

const LoginValidation = object({
  username: string()
    .email("Invalid Email Provided")
    .required("Username is required"),
  password: string().required("Password is required"),
});

export default function Login() {
  const { isRetry, handleLogin } = useContext<AuthContextType>(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 w-full min-h-screen flex flex-col gap-y-2 items-center justify-center font-mono bg-[url('../src/assets/images/login.png')] bg-cover bg-center">
      <div>
        <img src={logo} alt="iAssistant Logo" className="w-24 h-24 md:w-32 md:h-32 rounded-full object-contain" />
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 w-3/5 max-w-md">
        <h3 className="text-lg text-center font-bold mb-4 text-gray-800">Login to Proceed</h3>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginValidation}
          onSubmit={(values, { setSubmitting }) => {
            handleLogin({ username: values.username, password: values.password });
            setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="username" className="text-gray-700 font-medium mb-1">Username</label>
                <Field
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  id="username"
                />
                {errors.username && touched.username && (
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="text-gray-700 font-medium mb-1">Password</label>
                <Field
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  id="password"
                />
                {errors.password && touched.password && (
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                )}
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <Button
                  title="Login"
                />
                <Button
                  title="SignIn"
                  click={() => navigate(SIGNUP_ROUTE)}
                />
              </div>

              {/* Retry Message */}
              {isRetry && (
                <p className="text-red-500 text-center mt-3">Wrong Credentials, Retry!</p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>

  );
}
