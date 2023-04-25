import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import CreateSticker from "./pages/CreateSticker";
import FavoriteStickers from './pages/FavoriteStickers';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart/:id" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/create-sticker" element={<CreateSticker />} />
      <Route path="/favorites" element={<FavoriteStickers />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
