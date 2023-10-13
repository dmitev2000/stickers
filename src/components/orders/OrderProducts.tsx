import { PreviewOrderInterface } from "../../interfaces/Interfaces";
import StickerTable from "../stickers/StickerTable";
import "./Order.css";

const OrderProducts = ({ order }: { order: PreviewOrderInterface }) => {
  return (
    <div className="order-products">
      <h3 className="mb-4">Products</h3>
      <StickerTable
        stickers={order.stickersDetails}
        totalPrice={order.totalPrice}
      />
    </div>
  );
};

export default OrderProducts;
