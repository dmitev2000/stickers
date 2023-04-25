export interface Sticker {
  _id: string;
  __v: number;
  title: string;
  image: string;
  company: string;
  by: string;
  price: number;
  tags: string[];
  createdAt: string | null;
  modifiedAt: string | null;
  reviewed: boolean;
  status: string;
}

export interface CartItem {
  quantity: number;
  sticker: Sticker;
}

export interface CartContextType {
  stickerList: CartItem[];
  totalStickers: number;
  totalPrice: number;
  addSticker: (item: CartItem) => void;
  removeSticker: (sticker: CartItem) => void;
  increaseQuantity: (item: CartItem) => void;
  decreaseQuantity: (item: CartItem) => void;
  emptyCart: () => void;
}
