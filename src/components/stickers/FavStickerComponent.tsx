import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { AuthContext } from "../../context/AuthenticationContext";
import { FireNotification } from "../../utils/FireNotificiation";
import { BASE_URL, IMG_URL } from "../../utils/API_URLs";
import { Sticker } from "../../interfaces/Interfaces";
import DeleteIcon from "@mui/icons-material/Delete";
import CartContext from "../../context/CartContext";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import axios from "axios";
import "./Stickers.css";

const FavStickerComponent = ({ sticker_data }: { sticker_data: Sticker }) => {
  const AuthCtx = useContext(AuthContext);
  const CartCtx = useContext(CartContext);

  const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#ff1867",
      color: "black",
      boxShadow: theme.shadows[1],
      fontSize: 11,
      fontWeight: "bold"
    },
  }));

  const RemoveFromFavs = () => {};

  const AddToCart = () => {
    axios
      .post(`${BASE_URL}/cart/update-cart`, {
        userID: AuthCtx.state.user?._id,
        sticker: sticker_data,
        quantity: 1,
      })
      .then((res) => {
        CartCtx.addSticker({ sticker: sticker_data, quantity: 1 });
        FireNotification(
          `${sticker_data.title} sticker added to cart successfully!`
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="fav-sticker rounded">
      <img src={`${IMG_URL}/${sticker_data.image}`} />
      <div className="overlay"></div>
      <span className="remove" onClick={RemoveFromFavs}>
        <LightTooltip title="Remove">
          <DeleteIcon fontSize="medium" />
        </LightTooltip>
      </span>
      <span className="add" onClick={AddToCart}>
        <LightTooltip title="Add To Cart">
          <AddShoppingCartIcon fontSize="medium" />
        </LightTooltip>
      </span>
      <span className="title">{sticker_data.title}</span>
      <span className="price">${sticker_data.price.toFixed(2)}</span>
    </div>
  );
};

export default FavStickerComponent;
