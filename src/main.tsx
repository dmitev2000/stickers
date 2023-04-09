import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import Navbar from "./components/navbar/Navbar";
// import Footer from "./components/footer/Footer";
import { FilterContextProvider } from "./context/FilterContext";
import { AuthenticationContextProvider } from "./context/AuthenticationContext";
import { CartContextProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <AuthenticationContextProvider>
      <CartContextProvider>
        <Navbar />
        <FilterContextProvider>
          <App />
        </FilterContextProvider>
        {/* <Footer /> */}
      </CartContextProvider>
    </AuthenticationContextProvider>
  </BrowserRouter>
);
