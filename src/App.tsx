import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import CreateSticker from "./pages/CreateSticker";
import FavoriteStickers from './pages/FavoriteStickers';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/create-sticker" element={<CreateSticker />} />
      <Route path="/favorites" element={<FavoriteStickers />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
