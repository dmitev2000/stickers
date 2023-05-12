import { OrderType } from "../../interfaces/Interfaces";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import "./Order.css";

const Order = ({ orderDetails }: { orderDetails: OrderType }) => {
  return (
    <tr>
      <td>
        <div className="td-data">{orderDetails._id}</div>
      </td>
      <td>
        <div className="td-data">
          {orderDetails.createdAt.toString().substring(0, 10)}
        </div>
      </td>
      <td>
        <div className="td-data">${orderDetails.totalPrice.toFixed(2)}</div>
      </td>
      <td>
        <div className="td-data justify-content-center">
          {orderDetails.stickerList.reduce((accumulator, current) => {
            return accumulator + current.quantity;
          }, 0)}
        </div>
      </td>
      <td>
        <div className="td-data justify-content-center">
          {orderDetails.stickerList.length}
        </div>
      </td>
      <td>
        <div className="status">
          <span
            className={
              orderDetails.status === "Placed"
                ? "bg-warning p-2 rounded"
                : new Date(orderDetails.estimatedDelivery) <= new Date()
                ? "bg-primary p-2 rounded text-light"
                : "bg-success p-2 rounded text-light"
            }
          >
            {new Date(orderDetails.estimatedDelivery).getTime() <=
              new Date().getTime() && orderDetails.status === "Confirmed"
              ? "Delivered"
              : orderDetails.status}
          </span>
        </div>
      </td>
      <td className="text-center">
        <div className="td-data justify-content-center">
          <Link
            to={`/my-orders/preview-order/${orderDetails._id}`}
            className="btn text-muted"
          >
            <Tooltip title="Details">
              <InfoIcon />
            </Tooltip>
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default Order;
