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

export interface FavStickersType {
  stickerList: string[];
  totalStickers: number;
  clearFavorites: () => void;
  addStickerToFavorites: (stickerID: string) => void;
  removeStickerFromFavorites: (stickerID: string) => void;
}

export interface StickerInOrder {
  stickerID: string;
  quantity: number;
}

export interface OrderType {
  _id: string;
  userID: string;
  stickerList: StickerInOrder[];
  totalPrice: number;
  updatedAt: Date;
  createdAt: Date;
  status: string;
  rating: null | undefined | number;
  shippingDetails: ShippingDetails;
  confirmationDate: string | null;
  estimatedDelivery: string;
  __v: number;
}

export interface StickerDetails {
  sticker: Sticker;
  quantity: number;
}

export interface ShippingDetails {
  fullname: string;
  city: string;
  address: string;
  phone_number: string;
}

export interface PreviewOrderInterface {
  orderID: string;
  stickersDetails: StickerDetails[];
  totalPrice: number;
  shippingDetails: ShippingDetails;
  status: string;
  rating: null | number;
  estimatedDelivery: string;
  date: string;
  confirmationDate: string | null;
}

export interface PlacedOrderInterface {
  createdAt: string;
  estimatedDelivery: string;
  _id: string;
  __v: number;
  shippingDetails: ShippingDetails;
  status: string;
  totalPrice: number;
  updatedAt: string;
  userID: string;
  stickerList: StickerInOrder[];
}

export interface OrderStatisticsRecord {
  name: string;
  profit: number;
  stickers_sold: number;
  num_orders: number;
}

export interface CategoryChartData {
  name: string;
  value: number;
}

export interface AllTimeStatisticsInterface {
  totalOrders: number;
  totalProfit: number;
  totalStickers: number;
}

export interface UserInterface {
  _id: string;
  username: string;
  role: string;
  totalOrders: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface RatingStatsInterface {
  totalOrders: number;
  ratedOrders: number;
  avgRating: number;
}

export interface PopularStickerData {
  stickerID: string;
  data: {
    orders: number;
    count: number;
  };
}

export interface IPopularStickers {
  stickerData: Sticker[];
  topThree: PopularStickerData[];
}

export interface LastThreeMonthsStatisticsInterface {
  name: string;
  profit: string;
  stickers_sold: number;
  num_orders: number;
}

export interface IRejectedSticker {
  __v: number;
  _id: string;
  reason: string;
  sticker: Sticker;
}

export interface IUserStickersResponse {
  rejectedStickers: IRejectedSticker[];
  validStickers: Sticker[];
}
