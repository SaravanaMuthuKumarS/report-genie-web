import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../components/Button";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";
import { SIGNUP_ROUTE } from "../constants/appConstants";
import logo from "../../src/assets/images/logo.png";
import { AuthContextType } from "../types/appTypes";

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
    <div className="bg-gray-200 w-full min-h-screen flex flex-col items-center justify-center font-sans bg-cover bg-center bg-[url('../src/assets/images/login.png')]">
      {/* Logo Section */}
      <div className="mb-6">
        <img
          src={logo}
          alt="iAssistant Logo"
          className="w-20 h-20 md:w-24 md:h-24 rounded-full object-contain shadow-lg"
        />
      </div>

      {/* Login Form */}
      <div className="bg-white rounded-xl shadow-lg p-6 w-full sm:w-80">
        <h3 className="text-xl text-center font-semibold mb-4 text-gray-800">Login</h3>

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
              {/* Username Field */}
              <div className="flex flex-col">
                <label htmlFor="username" className="text-gray-700 font-medium mb-1">Username</label>
                <Field
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  id="username"
                />
                {errors.username && touched.username && (
                  <ErrorMessage name="username" component="div" className="text-red-500 text-xs mt-1" />
                )}
              </div>

              {/* Password Field */}
              <div className="flex flex-col">
                <label htmlFor="password" className="text-gray-700 font-medium mb-1">Password</label>
                <Field
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  id="password"
                />
                {errors.password && touched.password && (
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                )}
              </div>

              {/* Button Group */}
              <div className="mt-6 flex justify-center gap-3">
                <Button title="Login" />
                <Button
                  title="SignUp"
                  click={() => navigate(SIGNUP_ROUTE)}/>
              </div>

              {/* Retry Message */}
              {isRetry && (
                <p className="text-red-500 text-center mt-3 text-sm">Wrong Credentials, Retry!</p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
