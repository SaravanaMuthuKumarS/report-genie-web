import { createContext, useState } from "react";
import useLogin from "../hooks/AuthHooks";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../constants/appConstants";
import { AuthContextType } from "../types/appTypes";

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isFinance: false,
  userName: "",
  isRetry: false,
  accessToken: "",
  setUserName: () => { },
  setIsAuthenticated: () => { },
  setIsFinance: () => { },
  handleLogin: () => { },
  handleSignup: () => { },
  isDataUploaded: false,
  setIsDataUploaded: () => {},
});

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isFinance, setIsFinance] = useState<boolean>(false);
  const [isRetry, setRetry] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  const [isDataUploaded, setIsDataUploaded] = useState<boolean>(false);
  const { mutate } = useLogin();
  const navigate = useNavigate();

  async function handleSignup() {
    
  }

  async function handleLogin({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    try {
      await mutate({ username, password },
        {
          onSuccess: () => {
            const token: string = localStorage.getItem("accessToken")!;
            setAccessToken(token);
            setUserName(username);
            setRetry(false);
            navigate(HOME_ROUTE);
          },
        }
      );
    } catch (error) {
      setRetry(true);
      localStorage.removeItem("accessToken");
      alert("Username Password Mismatch");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isRetry,
        accessToken,
        userName,
        isFinance,
        setIsFinance,
        setUserName,
        handleLogin,
        handleSignup,
        setIsDataUploaded,
        isDataUploaded
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
