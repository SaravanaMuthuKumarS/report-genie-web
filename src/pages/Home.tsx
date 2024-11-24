import logo from "../../src/assets/images/logo.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Outlet, useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../constants/appConstants";
import { AuthContextType } from "../types/appTypes";

export default function Home() {
  const { isFinance } = useContext<AuthContextType>(AuthContext);
  const navigate = useNavigate();

  return (
      <div className="relative h-screen flex p-2">
        <div className="w-56 bg-gray-800 h-screen text-white flex flex-col p-4 shadow-lg rounded p-2 fixed">
          <div className="flex items-center justify-start mb-6">
            <img src={logo} alt="Logo" className="h-24 w-24 opacity-70" />
          </div>

          <ul className="space-y-4 flex-grow">
            <li
              className="hover:bg-gray-700 p-2 rounded cursor-pointer"
              onClick={() => navigate(HOME_ROUTE)}
            >
              Home
            </li>
            {!isFinance ? (
              <li
                className="hover:bg-gray-700 p-2 rounded cursor-pointer"
                onClick={() => navigate("consolidation")}
              >
                Consolidation Report
              </li>
            ) : (
              <li
                className="hover:bg-gray-700 p-2 rounded cursor-pointer"
                onClick={() => navigate("reports")}
              >
                Finance Innvoice
              </li>
            )}
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
              About
            </li>
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
              Services
            </li>
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
              Contact
            </li>
          </ul>
        </div>
      <Outlet></Outlet>
      </div>
  );
}
