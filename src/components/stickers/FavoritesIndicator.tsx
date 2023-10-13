import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthenticationContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoritesContext from "../../context/FavoritesContext";

const FavoritesIndicator = () => {
  const AuthCtx = useContext(AuthContext);
  const FavsCtx = useContext(FavoritesContext);
  const navigate = useNavigate();

  return (
    <div
      style={{ cursor: "pointer", color: "#ff1867" }}
      className="d-flex justify-content-center align-items-center mx-2"
      onClick={() => {
        navigate(`/favorites/${AuthCtx.state.user?._id}`);
      }}
    >
      <Tooltip title="Favorites">
        <Badge badgeContent={FavsCtx.totalStickers} color="success">
          <FavoriteIcon />
        </Badge>
      </Tooltip>
    </div>
  );
};

export default FavoritesIndicator;
