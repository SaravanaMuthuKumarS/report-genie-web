import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./route/AppRoutes";
import AppContextProvider from "./context/AppContextProvider";
import AuthContextProvider from "./context/AuthContextProvider";

export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppContextProvider>
          <AppRoutes />
        </AppContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
