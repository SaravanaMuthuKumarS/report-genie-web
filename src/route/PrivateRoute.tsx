import { useContext } from "react";
import { AuthContext, AuthContextType } from "../context/AuthContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import { LOGIN_ROUTE } from "../constants/appConstants";

export default function PrivateRoute() {
  const { isAuthenticated } = useContext<AuthContextType>(AuthContext);
  return isAuthenticated ? <Outlet /> : <Navigate to={LOGIN_ROUTE} replace />;
}