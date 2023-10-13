import { OrderType } from "../../interfaces/Interfaces";
import Order from "./Order";
import DataTable from "datatables.net-dt";
import { useEffect } from "react";
import "../../../node_modules/datatables.net-dt/css/jquery.dataTables.css";

const OrderList = ({ orders, view }: { orders: OrderType[], view: string }) => {
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
          {view === "Admin" && <th>User</th>}
          <th>Date</th>
          <th>Price</th>
          {view === "User" && <th className="text-center">Total products</th>}
          {view === "User" && <th className="text-center">Different products</th>}
          <th className="text-center">Status</th>
          <th className="text-center">Rated</th>
          <th className="text-center">Details</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
          return <Order key={order._id} orderDetails={order} view={view} />;
        })}
      </tbody>
    </table>
  );
};

export default OrderList;
