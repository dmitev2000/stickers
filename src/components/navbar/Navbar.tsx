import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <Link to="/" className="logo">
        <img src={logo} alt="logo" />
        Rainbow Stickers
        </Link>
      <Link to="/cart" className="cart-btn">
        <i className="bi bi-cart"></i> View Cart (0)
      </Link>
    </nav>
  );
};

export default Navbar;
