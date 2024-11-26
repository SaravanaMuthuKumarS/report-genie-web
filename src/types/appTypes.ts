export interface AuthContextType {
    isAuthenticated: boolean;
    isFinance: boolean;
    userName: string;
    isRetry: boolean;
    accessToken: string;
    setUserName: (userName: string) => void;
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
    isDataUploaded: boolean;
    setIsDataUploaded: (isDataUploaded: boolean) => void;
  }

  export interface Project {
    id: string;
    name: string;
}

  export interface AppContextType {
    projects: Project[];
  }