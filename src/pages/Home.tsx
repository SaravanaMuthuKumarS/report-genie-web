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
    <div className="relative h-screen flex bg-gray-100">
      <div className="w-64 bg-gradient-to-b from-blue-500 to-blue-700 h-screen text-white flex flex-col p-6 shadow-xl fixed z-20">
        <div className="flex items-center justify-start mb-10">
          <img
            src={logo}
            alt="Logo"
            className="h-24 w-24 opacity-90 rounded-full shadow-md"
          />
        </div>
        <ul className="space-y-6 flex-grow">
          <li
            className="hover:bg-blue-600 p-3 rounded-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => navigate(HOME_ROUTE)}
          >
            Home
          </li>
          {true ? (
            <li
              className="hover:bg-blue-600 p-3 rounded-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => navigate("consolidation")}
            >
              Consolidation Report
            </li>
          ) : (
            <li
              className="hover:bg-blue-600 p-3 rounded-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => navigate("reports")}
            >
              Finance Invoice
            </li>
          )}
          <li
            className="hover:bg-blue-600 p-3 rounded-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => {}}
          >
            About
          </li>
          <li
            className="hover:bg-blue-600 p-3 rounded-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => {}}
          >
            Services
          </li>
          <li
            className="hover:bg-blue-600 p-3 rounded-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => {}}
          >
            Contact
          </li>
        </ul>
      </div>
      <div className="ml-64 w-full">
        <Outlet />
      </div>
    </div>
  );
}
