import { OrderType } from "../../interfaces/Interfaces";
import Order from "./Order";
const OrderList = ({ orders }: { orders: OrderType[] }) => {
  return (
    <div className="d-flex align-items-center justify-content-start gap-3">
      {orders.map((order, index) => {
        return <Order key={order._id} orderDetails={order} />;
      })}
    </div>
  );
};

export default OrderList;
