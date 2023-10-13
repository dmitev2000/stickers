import { OrderType } from "../../interfaces/Interfaces";
import InfoIcon from "@mui/icons-material/Info";
import StarIcon from "@mui/icons-material/Star";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import "./Order.css";

const Order = ({
  orderDetails,
  view,
}: {
  orderDetails: OrderType;
  view: string;
}) => {
  return (
    <tr>
      <td>
        <div className="td-data">{orderDetails._id}</div>
      </td>
      {view === "Admin" && (
        <td>
          <div className="td-data justify-content-start">
            <Tooltip title={orderDetails.shippingDetails.fullname}>
              <span>{orderDetails.userID}</span>
            </Tooltip>
          </div>
        </td>
      )}
      <td>
        <div className="td-data">
          {orderDetails.createdAt.toString().substring(0, 10)}
        </div>
      </td>
      <td>
        <div className="td-data">${orderDetails.totalPrice.toFixed(2)}</div>
      </td>
      {view === "User" && (
        <td>
          <div className="td-data justify-content-center">
            {orderDetails.stickerList.reduce((accumulator, current) => {
              return accumulator + current.quantity;
            }, 0)}
          </div>
        </td>
      )}
      {view === "User" && (
        <td>
          <div className="td-data justify-content-center">
            {orderDetails.stickerList.length}
          </div>
        </td>
      )}
      <td>
        <div className="status">
          <span
            className={
              orderDetails.status === "Placed"
                ? "placed p-2 rounded"
                : new Date(orderDetails.estimatedDelivery) <= new Date()
                ? "delivered p-2 rounded"
                : "confirmed p-2 rounded"
            }
          >
            {new Date(orderDetails.estimatedDelivery).getTime() <=
              new Date().getTime() && orderDetails.status === "Confirmed"
              ? "Delivered"
              : orderDetails.status}
          </span>
        </div>
      </td>
      <td>
        <div className="td-data justify-content-center">
          {orderDetails.rating ? (
            <>
              <StarIcon color="warning" />
              <p className="mb-0 table-rating">{orderDetails.rating}</p>
            </>
          ) : (
            <p className="mb-0 not-rated table-rating">Not rated</p>
          )}
        </div>
      </td>
      <td className="text-center">
        <div className="td-data justify-content-center">
          <Link
            to={`/my-orders/preview-order/${orderDetails._id}`}
            className="btn text-muted"
          >
            <Tooltip title="Details">
              <InfoIcon color="warning" />
            </Tooltip>
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default Order;
