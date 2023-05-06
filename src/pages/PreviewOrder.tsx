import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loader } from "rsuite";
import Rating from "@mui/material/Rating";
import { PreviewOrderInterface } from "../interfaces/Interfaces";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";

const PreviewOrder = () => {
  const { id } = useParams();
  const URL = `http://localhost:5000/api/orders/${id}`;
  const [order, setOrder] = useState<PreviewOrderInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [orderStatusCode, setOrderStatusCode] = useState(1);

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        if (res.data.status === "Placed") {
          setOrderStatusCode(1);
        } else if (res.data.status === "Confirmed") {
          setOrderStatusCode(2);
        } else if (res.data.status === "Processed") {
          setOrderStatusCode(3);
        }
        setOrder(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return (
      <div className="loader-wrapper">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h3 className="mb-5">Preview Order</h3>
      {order && (
        <>
          <div className="order-preview">
            <div className="order-details">
              <h5 className="mb-4">Details</h5>
              <p>ID: {order.orderID}</p>
              <p>Price: ${order.totalPrice}</p>
              {new Date(order.estimatedDelivery) > new Date() ? (
                <p>
                  Estimated delivery:{" "}
                  {new Date(order.estimatedDelivery)
                    .toString()
                    .substring(0, 15)}
                </p>
              ) : (
                <p>Delivered</p>
              )}
              {order.rating === null ? (
                <div className="d-flex gap-4">
                  <p>Rate this order:</p>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event: any) => {
                      setRating(+event.target.value);
                    }}
                  />
                </div>
              ) : (
                <div className="d-flex gap-3">
                  <p>You rated: </p>
                  <Rating name="read-only" value={order.rating} readOnly />
                </div>
              )}
            </div>
            <div className="order-products">
              <h5>Products</h5>
            </div>
          </div>
          <div className="track-order">
            <h3 className="mb-4">Track Order</h3>
            <div className="d-flex">
              <div className="d-flex flex-column gap-4">
                <div className="order-placed">
                  <div className="step">
                    <div className="circle-first"></div>
                    <div className="icon-wrapper">
                      <NoteAltIcon
                        style={{ color: "white" }}
                        fontSize="large"
                      />
                    </div>
                    <div>
                      <p className="fw-bold">Order Placed</p>
                      <span className="text-muted">
                        We have received your order on{" "}
                        {order.date.substring(0, 10)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="order-confirmed">
                  <div
                    className={orderStatusCode > 1 ? "step" : "step step-inv"}
                  >
                    <div className="circle"></div>
                    <div className="icon-wrapper">
                      <CreditScoreIcon
                        style={{ color: "white" }}
                        fontSize="large"
                      />
                    </div>
                    <div>
                      <p className="fw-bold">Order Confirmed</p>
                      <span className="text-muted">
                        We have confirmed your order{" "}
                        {order.confirmationDate && (
                          <>on {order.confirmationDate.substring(0, 10)}</>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="order-processed">
                  <div
                    className={orderStatusCode === 3 ? "step" : "step step-inv"}
                  >
                    <div className="circle"></div>
                    <div className="icon-wrapper">
                      <DoneOutlineIcon
                        style={{ color: "white" }}
                        fontSize="large"
                      />
                    </div>
                    <div>
                      <p className="fw-bold">Order Processed</p>
                      <span className="text-muted">
                        We are preparing your order
                      </span>
                    </div>
                  </div>
                </div>
                <div className="order-ready-to-ship">
                  <div
                    className={orderStatusCode > 2 ? "step" : "step step-inv"}
                  >
                    <div className="circle"></div>
                    <div className="icon-wrapper">
                      <NoCrashIcon
                        style={{ color: "white" }}
                        fontSize="large"
                      />
                    </div>
                    <div>
                      <p className="fw-bold">Ready to Ship</p>
                      <span className="text-muted">
                        Your order is ready for shipping
                      </span>
                    </div>
                  </div>
                </div>
                <div className="order-out-for-delivery">
                  <div
                    className={orderStatusCode > 2 ? "step" : "step step-inv"}
                  >
                    <div className="circle"></div>
                    <div className="icon-wrapper">
                      <LocalShippingIcon
                        style={{ color: "white" }}
                        fontSize="large"
                      />
                    </div>
                    <div>
                      <p className="fw-bold">Out for Delivery</p>
                      <span className="text-muted">
                        Your order is out for delivery
                      </span>
                    </div>
                  </div>
                </div>
                <div className="order-delivered">
                  <div
                    className={
                      new Date() >= new Date(order.estimatedDelivery)
                        ? "step"
                        : "step step-inv"
                    }
                  >
                    <div className="circle"></div>
                    <div className="icon-wrapper">
                      <InventoryIcon
                        style={{ color: "white" }}
                        fontSize="large"
                      />
                    </div>
                    <div>
                      <p className="fw-bold">Delivered</p>
                      <span className="text-muted">
                        Your order has been delivered on{" "}
                        {order.estimatedDelivery.substring(0, 10)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PreviewOrder;
