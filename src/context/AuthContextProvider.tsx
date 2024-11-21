import { createContext, useState } from "react";
import useLogin from "../hooks/AuthHooks";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../constants/appConstants";

export interface AuthContextType {
  isAuthenticated: boolean;
  isFinance: boolean;
  userId: number;
  isRetry: boolean;
  accessToken: string;
  setUserId: (userId: number) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsFinance: (isAdmin: boolean) => void;
  handleLogin: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => void;
  handleSignup: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isFinance: false,
  userId: 0,
  isRetry: false,
  accessToken: "",
  setUserId: () => { },
  setIsAuthenticated: () => { },
  setIsFinance: () => { },
  handleLogin: () => { },
  handleSignup: () => { },
});

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isFinance, setIsFinance] = useState<boolean>(false);
  const [isRetry, setRetry] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const [accessToken, setAccessToken] = useState<string>("");
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
        userId,
        isFinance,
        setIsFinance,
        setUserId,
        handleLogin,
        handleSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
