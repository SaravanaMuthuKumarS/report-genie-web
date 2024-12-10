import { useContext } from "react";
import { AuthContextType } from "../types/appTypes";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const { isFinance } = useContext<AuthContextType>(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative text-center px-8">
        <div className="text-5xl md:text-6xl font-extrabold text-white mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Welcome to <span className="text-yellow-400">Report Genie!</span>
        </div>
        <p className="text-xl md:text-2xl text-white mb-8 animate__animated animate__fadeIn animate__delay-2s">
          Your one-stop solution for smarter reporting and innvoice generation.
        </p>
        <button onClick={() => isFinance ? navigate("reports"): navigate("consolidation")} className="px-6 py-3 bg-yellow-500 text-white rounded-full text-xl font-semibold hover:bg-yellow-600 transform transition-all duration-300 ease-in-out hover:scale-105 animate__animated animate__fadeIn animate__delay-3s">
          Get Started
        </button>
      </div>
    </div>
  );
}
