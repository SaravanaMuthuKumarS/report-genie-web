import { createContext, useState } from "react";
import useLogin, { useSignup } from "../hooks/AuthHooks";
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
  setRetry: () => { },
  setIsAuthenticated: () => { },
  setIsFinance: () => { },
  handleLogin: () => { },
  handleSignup: () => { },
  isDataUploaded: false,
  setIsDataUploaded: () => { },
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
  const { mutate: loginMutate } = useLogin();
  const { mutate: signupMutate } = useSignup();
  const navigate = useNavigate();

  async function handleSignup({
    fullName,
    password,
    mailId,
    projects,
    isFinance
  }:
    {
      fullName: string;
      password: string;
      mailId: string;
      projects: { id: string }[];
      isFinance: boolean;
    }) {
    try {
      await signupMutate({ fullName, password, mailId, projects, isFinance },
        {
          onSuccess: () => {
            const token: string = localStorage.getItem("accessToken")!;
            setIsAuthenticated(true);
            setAccessToken(token);
            setUserName(mailId);
            setRetry(false);
            setIsFinance("true" === localStorage.getItem("role"));
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

  async function handleLogin({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    try {
      await loginMutate({ username, password },
        {
          onSuccess: () => {
            const token: string = localStorage.getItem("accessToken")!;
            setAccessToken(token);
            setIsAuthenticated(true);
            setUserName(username);
            setRetry(false);
            setIsFinance("true" === localStorage.getItem("role"));
            navigate(HOME_ROUTE);
          },
          onError: () => {
            setRetry(true);
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
        setRetry,
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
