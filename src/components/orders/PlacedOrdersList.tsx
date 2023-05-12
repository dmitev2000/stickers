import { PlacedOrderInterface } from "../../interfaces/Interfaces";
import PlacedOrder from "./PlacedOrder";

const PlacedOrdersList = ({
  placedOrders,
}: {
  placedOrders: PlacedOrderInterface[];
}) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Price</th>
            <th>Datetime</th>
            <th className="text-center">Products</th>
            <th className="text-center">Shipping details</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {placedOrders.map((order) => {
            return <PlacedOrder key={order._id} order={order} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PlacedOrdersList;
