import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import AuthContextProvider from "../context/AuthContextProvider";
import PrivateRoute from "./PrivateRoute";
import {
  ROOT_ROUTE,
  LOGIN_ROUTE,
  HOME_ROUTE,
  SIGNUP_ROUTE,
} from "../constants/appConstants";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignIn from "../pages/Signup";
import ConsolidationReport from "../pages/ConsolidationReport";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={HOME_ROUTE} element={<Home />}>
      <Route path="consolidation" element={<ConsolidationReport />} />
      </Route>
      <Route path={ROOT_ROUTE} element={<AppLayout />}>
        <Route
          path={LOGIN_ROUTE}
          element={
            <AuthContextProvider>
              <Login />
            </AuthContextProvider>
          }
        />
        <Route
          path={SIGNUP_ROUTE}
          element={
            <AuthContextProvider>
              <SignIn />
            </AuthContextProvider>
          }
        />
        <Route index element={<Navigate to={LOGIN_ROUTE} replace />} />
        <Route
          element={
            <AuthContextProvider>
              <PrivateRoute />
            </AuthContextProvider>
          }
        ></Route>
      </Route>
    </Routes>
  );
}
