import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./route/AppRoutes";
import AppContextProvider from "./context/AppContextProvider";

export default function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <AppRoutes />
      </AppContextProvider>
    </BrowserRouter>
  );
}
