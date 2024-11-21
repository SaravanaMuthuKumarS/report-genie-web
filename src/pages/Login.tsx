import { useContext } from "react";
import { AuthContext, AuthContextType } from "../context/AuthContextProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../components/Button";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";
import { SIGNUP_ROUTE } from "../constants/appConstants";

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
    <div className="bg-gray-100 w-screen h-screen flex flex-col items-center justify-center font-mono bg-[url('../src/assets/images/login.png')]">
      <p className="text-white font-bold text-4xl p-8">Welcome to iAssistant!</p>
      <div className="bg-gray-200 rounded-lg shadow-md p-4">
        <h3 className="text-lg text-center font-bold mb-4">Login to Proceed</h3>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginValidation}
          onSubmit={(values, { setSubmitting }) => {
            handleLogin({ username: values.username, password: values.password });
            setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="flex justify-around gap-2">
                <div>
                  <div className="flex gap-6 items-center justify-between">
                    <p>UserName :</p>
                    <Field
                      className="px-2 rounded"
                      type="text"
                      name="username"
                      placeholder="Enter Your Name"
                    />
                  </div>
                  <div className="flex gap-6 items-center justify-between mt-2">
                    <p>Password :</p>
                    <Field
                      className="px-2 rounded"
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  {errors.username && touched.username && (
                    <ErrorMessage name="username" component="div" />
                  )}
                  {errors.password && touched.password && (
                    <ErrorMessage name="password" component="div" />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-around cursor-pointer">
                <Button title="Login" />
              </div>
              {isRetry && (
                <p className="text-red-500">Wrong Credentials, Retry !</p>
              )}
            </Form>
          )}
        </Formik>
        <div className="flex items-center justify-around gap-4">
        <p className="text-lg mt-3 text-black">
          New User ? Register  
        </p>
        <Button title="SignIn" click={() => navigate(SIGNUP_ROUTE)} />
      </div>
      </div>
    </div>
  );
}
