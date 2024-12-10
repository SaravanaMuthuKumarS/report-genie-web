import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
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
import Welcome from "../pages/Welcome";
import FinanceReport from "../pages/FinanceReport";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path={HOME_ROUTE} element={<Home />}>
          <Route path="consolidation" element={<ConsolidationReport />} />
          <Route path="reports" element={<FinanceReport />} />
          <Route index element={<Welcome />} />
        </Route>
      </Route>
      <Route path={ROOT_ROUTE} element={<AppLayout />}>
        <Route path={LOGIN_ROUTE} element={<Login />} />
        <Route path={SIGNUP_ROUTE} element={<SignIn />} />
        <Route index element={<Navigate to={LOGIN_ROUTE} replace />} />
      </Route>
    </Routes>);
}
