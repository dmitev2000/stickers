import { useState, createContext, useEffect } from "react";
import { CartItem, CartContextType } from "../interfaces/Interfaces";

const getStoredCartItems = () => {
  try {
    const cartItems = localStorage.getItem("cartItems");
    const stickerList = cartItems ? JSON.parse(cartItems) : [];
    return stickerList;
  } catch (error) {
    return [];
  }
};

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
  const [stickerList, setStickerList] = useState(getStoredCartItems());
  const [totalStickers, setTotalStickers] = useState(
    getStoredCartItems().reduce(
      (accumulator: number, currentValue: any) =>
        accumulator + currentValue.quantity,
      0
    )
  );
  const [totalPrice, setTotalPrice] = useState(
    getStoredCartItems().reduce(
      (accumulator: number, currentValue: any) =>
        accumulator + currentValue.quantity * currentValue.sticker.price,
      0
    )
  );

  const addSticker = (item: any) => {
    const index = stickerList.findIndex((s: any) => {
      return s.sticker._id === item.sticker._id;
    });
    if (index === -1) {
      setStickerList((prev: any) => prev.concat(item));
      setTotalStickers((prev: any) => prev + item.quantity);
      setTotalPrice((prev: any) => prev + item.quantity * item.sticker.price);
    } else {
      const updatedList: any = stickerList;
      updatedList[index].quantity = updatedList[index].quantity + item.quantity;
      setStickerList(() => updatedList);
      setTotalStickers((prev: any) => prev + item.quantity);
      setTotalPrice((prev: any) => prev + item.quantity * item.sticker.price);
    }
  };

  const increaseQuantity = (item: any) => {
    const index = stickerList.findIndex((s: any) => {
      return s.sticker._id === item.sticker._id;
    });
    const updatedList: any = stickerList;
    updatedList[index].quantity = updatedList[index].quantity + 1;
    setStickerList(() => updatedList);
    setTotalStickers((prev: any) => prev + 1);
    setTotalPrice((prev: any) => prev + item.sticker.price);
  };

  const decreaseQuantity = (item: any) => {
    const index = stickerList.findIndex((s: any) => {
      return s.sticker._id === item.sticker._id;
    });
    const updatedList: any = stickerList;
    if (updatedList[index].quantity > 1) {
      updatedList[index].quantity = updatedList[index].quantity - 1;
      setStickerList(() => updatedList);
      setTotalStickers((prev: any) => prev - 1);
      setTotalPrice((prev: any) => prev - item.sticker.price);
    }
  };

  const removeSticker = (item: any) => {
    console.log(item.sticker);
    setStickerList((prev: any) =>
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

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(stickerList));
  }, [totalStickers]);

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
