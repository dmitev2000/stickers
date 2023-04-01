import { NavLink } from "react-router-dom";
import "./BrowseOptions.css";

const BrowseOptions = () => {
  return (
    <div className="browse-options">
      <NavLink
        to="/"
        className={({ isActive }) =>
          !isActive ? "bo-link" : "bo-link-active"
        }
      >
        Browse Stickers
      </NavLink>
      <NavLink
        to="/create-sticker"
        className={({ isActive }) =>
          !isActive ? "bo-link" : "bo-link-active"
        }
      >
        Create Your Sticker
      </NavLink>
      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          !isActive ? "bo-link" : "bo-link-active"
        }
      >
        Favorite Stickers
      </NavLink>
    </div>
  );
};

export default BrowseOptions;
