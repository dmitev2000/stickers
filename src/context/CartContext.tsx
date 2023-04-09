import { useState, createContext } from "react";
import { CartItem, CartContextType } from "../interfaces/Interfaces";
import { FireErrorNotification } from "../utils/FireNotificiation";

const CartContext = createContext<CartContextType>({
  stickerList: [],
  totalStickers: 0,
  totalPrice: 0,
  addSticker: (item: CartItem) => {},
  removeSticker: (item: CartItem) => {},
  increaseQuantity: (item: CartItem) => {},
  decreaseQuantity: (item: CartItem) => {},
  emptyCart: () => {},
});

export const CartContextProvider = (props: any) => {
  const [stickerList, setStickerList] = useState([]);
  const [totalStickers, setTotalStickers] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const addSticker = (item: any) => {
    const index = stickerList.findIndex((s: any) => {
      return s.sticker._id === item.sticker._id;
    });
    if (index === -1) {
      setStickerList((prev) => prev.concat(item));
      setTotalStickers((prev) => prev + item.quantity);
      setTotalPrice((prev) => prev + item.quantity * item.sticker.price);
    } else {
      const updatedList: any = stickerList;
      updatedList[index].quantity = updatedList[index].quantity + item.quantity;
      setStickerList(() => updatedList);
      setTotalStickers((prev) => prev + item.quantity);
      setTotalPrice((prev) => prev + item.quantity * item.sticker.price);
    }
  };

  const increaseQuantity = (item: any) => {
    const index = stickerList.findIndex((s: any) => {
      return s.sticker._id === item.sticker._id;
    });
    const updatedList: any = stickerList;
    updatedList[index].quantity = updatedList[index].quantity + 1;
    setStickerList(() => updatedList);
    setTotalStickers((prev) => prev + 1);
    setTotalPrice((prev) => prev + item.sticker.price);
  };

  const decreaseQuantity = (item: any) => {
    const index = stickerList.findIndex((s: any) => {
      return s.sticker._id === item.sticker._id;
    });
    const updatedList: any = stickerList;
    updatedList[index].quantity = updatedList[index].quantity - 1;
    if (updatedList[index].quantity === 0) {
      updatedList.splice(index, 1);
      FireErrorNotification(
        `${item.sticker.title} sticker is removed from the cart.`
      );
    }
    setStickerList(() => updatedList);
    setTotalStickers((prev) => prev - 1);
    setTotalPrice((prev) => prev - item.sticker.price);
  };

  const removeSticker = (item: any) => {
    console.log(item.sticker);
    setStickerList((prev) =>
      prev.filter((s: any) => {
        return s.sticker._id !== item.sticker._id;
      })
    );
    setTotalPrice((prev: any) => {
      return prev - item.sticker.price * item.quantity;
    });
    setTotalStickers((prev: any) => {
      return prev - item.quantity;
    });
  };

  const emptyCart = () => {
    setStickerList(() => []);
    setTotalStickers(() => 0);
    setTotalPrice(() => 0);
  };

  const context = {
    stickerList: stickerList,
    totalStickers: totalStickers,
    totalPrice: totalPrice,
    addSticker: addSticker,
    removeSticker: removeSticker,
    increaseQuantity: increaseQuantity,
    decreaseQuantity: decreaseQuantity,
    emptyCart: emptyCart,
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
