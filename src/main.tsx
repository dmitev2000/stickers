import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import Navbar from "./components/navbar/Navbar";
// import Footer from "./components/footer/Footer";
import { FilterContextProvider } from "./context/FilterContext";
import { AuthContextProvider } from "./context/AuthenticationContext";
import { CartContextProvider } from "./context/CartContext";
import { FavoritesContextProvider } from "./context/FavoritesContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <AuthContextProvider>
      <CartContextProvider>
        <FavoritesContextProvider>
          <Navbar />
          <FilterContextProvider>
            <App />
          </FilterContextProvider>
          {/* <Footer /> */}
        </FavoritesContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
