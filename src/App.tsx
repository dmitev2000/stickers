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
import MyOrders from "./pages/MyOrders";
import PreviewOrder from "./pages/PreviewOrder";
import OrderStatistics from "./pages/admin/OrderStatistics";
import Forbidden from "./pages/Forbidden";
import PopularStickers from "./pages/PopularStickers";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart/:id" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/my-orders/:id" element={<MyOrders />} />
      <Route path="/my-orders/preview-order/:id" element={<PreviewOrder />} />
      <Route path="/create-sticker" element={<CreateSticker />} />
      <Route path="/favorites/:user_id" element={<FavoriteStickers />} />
      <Route path="/popular" element={<PopularStickers />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/order-statistics" element={<OrderStatistics />} />
      <Route path="/forbidden" element={<Forbidden />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
