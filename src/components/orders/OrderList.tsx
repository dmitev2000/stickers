import { OrderType } from "../../interfaces/Interfaces";
import Order from "./Order";
import DataTable from "datatables.net-dt";
import { useEffect } from "react";
import "../../../node_modules/datatables.net-dt/css/jquery.dataTables.css";

const OrderList = ({ orders }: { orders: OrderType[] }) => {
  useEffect(() => {
    const dtConfig = {
      language: {
        searchPlaceholder: "Date, Status, Order ID",
      },
    };
    new DataTable("#table", dtConfig);
  }, []);

  return (
    <table id="table" className="table table-hover">
      <thead className="table-dark">
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>Price</th>
          <th className="text-center">Total products</th>
          <th className="text-center">Different products</th>
          <th className="text-center">Status</th>
          <th className="text-center">Details</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => {
          return <Order key={order._id} orderDetails={order} />;
        })}
      </tbody>
    </table>
  );
};

export default OrderList;
