import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/loader/Loader";
import Rating from "@mui/material/Rating";
import { PreviewOrderInterface } from "../interfaces/Interfaces";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import HomeIcon from "@mui/icons-material/Home";
import Person3Icon from "@mui/icons-material/Person3";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { FireNotification } from "../utils/FireNotificiation";
import { AuthContext } from "../context/AuthenticationContext";
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";
import { FireErrorNotification } from "../utils/FireNotificiation";
import TrackOrder from "../components/orders/TrackOrder";
import OrderProducts from "../components/orders/OrderProducts";
import { BASE_URL } from "../utils/API_URLs";

const PreviewOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<PreviewOrderInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [reload, setReload] = useState<boolean>(true);
  const [rating, setRating] = useState<number>(0);
  const AuthCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setError(null);
    setLoading(true);
    axios
      .get(`${BASE_URL}/orders/${id}/${AuthCtx.state.user?._id}`, {
        headers: {
          Authorization: `Bearer ${AuthCtx.state.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setOrder(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [reload]);

  const CancelOrderHandler = () => {
    Swal.fire({
      title: "You are about to cancel your order. Are you sure?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#ff1867",
      denyButtonColor: "#27282c",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${BASE_URL}/orders/cancel-order/${order?.orderID}/${AuthCtx.state.user?._id}`,
            {
              headers: {
                Authorization: `Bearer ${AuthCtx.state.token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            FireErrorNotification("Your order has been canceled.");
            navigate(`/my-orders/${AuthCtx.state.user?._id}`);
          })
          .catch((err) => console.error(err));
      }
    });
  };

  const RateOrder = () => {
    axios
      .post(
        `http://localhost:5000/api/orders/set-rating/${AuthCtx.state.user?._id}`,
        {
          orderID: order?.orderID,
          rating: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${AuthCtx.state.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        FireNotification(res.data);
        setReload((prev) => !prev);
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return (
      <div className="loader-wrapper2">
        <Loader />
      </div>
    );
  }

  if (error !== null) {
    return <div className="loader-wrapper2">{error.response.data}</div>;
  }

  return (
    <div className="container my-5">
      <div className="mb-5 d-flex justify-content-between align-items-center">
        <h1 className="dashboard-h">Preview Order</h1>
        <div className="d-flex gap-2">
          <Link
            to={`/my-orders/${AuthCtx.state.user?._id}`}
            className="custom-buttons rounded"
          >
            My orders
            <ListAltIcon />
          </Link>
          {order?.status === "Placed" && (
            <button
              className="custom-buttons rounded"
              onClick={CancelOrderHandler}
            >
              Cancel order
              <CancelIcon />
            </button>
          )}
        </div>
      </div>
      {order && (
        <>
          <div className="order-preview">
            <div className="order-details">
              <h3 className="mb-4 mx-2">Details</h3>
              <p>
                <span className="fw-bold mx-2">
                  <Grid3x3Icon style={{ marginRight: "15px" }} />
                  Order ID:
                </span>{" "}
                <span className="text-muted">{order.orderID}</span>
              </p>
              <p>
                <span className="fw-bold mx-2">
                  <AttachMoneyIcon style={{ marginRight: "15px" }} />
                  Price:
                </span>{" "}
                <span className="text-muted">
                  ${order.totalPrice.toFixed(2)}
                </span>
              </p>
              {new Date(order.estimatedDelivery) > new Date() &&
              order.status !== "Placed" ? (
                <p>
                  <span className="fw-bold mx-2">
                    <AccessTimeIcon style={{ marginRight: "15px" }} />
                    Estimated delivery:
                  </span>{" "}
                  <span className="text-muted">
                    {new Date(order.estimatedDelivery)
                      .toString()
                      .substring(0, 15)}
                  </span>
                </p>
              ) : (
                <p className="mx-2">
                  <AccessTimeIcon style={{ marginRight: "15px" }} />
                  {order.status !== "Placed" ? (
                    <>
                      <span className="fw-bold">Delivered:</span>{" "}
                      {new Date(order.estimatedDelivery)
                        .toString()
                        .substring(0, 15)}
                    </>
                  ) : (
                    <>
                      <span className="fw-bold">Delivery:</span>{" "}
                      <span className="text-muted">
                        Your order is still not confirmed by our stuff.
                      </span>
                    </>
                  )}
                </p>
              )}
              {order.rating === null ? (
                <div className="d-flex gap-1">
                  <p className="fw-bold mx-2">
                    <StarBorderIcon style={{ marginRight: "15px" }} />
                    Rate this order:
                  </p>
                  {new Date(order.estimatedDelivery.toString()) > new Date() ||
                  order.status === "Placed" ? (
                    <p className="text-muted">Unavailable until delivery</p>
                  ) : (
                    <>
                      <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event: any) => {
                          setRating(+event.target.value);
                        }}
                      />
                      {rating !== 0 && (
                        <>
                          <button onClick={RateOrder} className="rating-submit">
                            Submit
                          </button>
                          <button
                            onClick={() => setRating(0)}
                            className="clear-rating"
                          >
                            Clear
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div className="d-flex gap-2">
                  <p className="mx-2">
                    <StarBorderIcon style={{ marginRight: "15px" }} />
                    <span className="fw-bold">You rated:</span>{" "}
                  </p>
                  <Rating name="read-only" value={order.rating} readOnly />(
                  {order.rating})
                </div>
              )}
              <div className="d-flex flex-column">
                <p className="fw-bold mx-2">
                  <LocalShippingIcon style={{ marginRight: "15px" }} />
                  Shipping Details
                </p>
                <p className="mx-2">
                  <Person3Icon style={{ marginRight: "15px" }} />
                  <span className="fw-bold">Full name: </span>
                  <span className="text-muted">
                    {order.shippingDetails.fullname}
                  </span>
                </p>
                <p className="mx-2">
                  <LocationCityIcon style={{ marginRight: "15px" }} />
                  <span className="fw-bold">City: </span>
                  <span className="text-muted">
                    {order.shippingDetails.city}
                  </span>
                </p>
                <p className="mx-2">
                  <HomeIcon style={{ marginRight: "15px" }} />
                  <span className="fw-bold">Address: </span>
                  <span className="text-muted">
                    {order.shippingDetails.address}
                  </span>
                </p>
                <p className="mx-2">
                  <PhoneAndroidIcon style={{ marginRight: "15px" }} />
                  <span className="fw-bold">Phone number: </span>
                  <span className="text-muted">
                    {order.shippingDetails.phone_number}
                  </span>
                </p>
              </div>
            </div>
            <OrderProducts order={order} />
          </div>
          <TrackOrder order={order} />
        </>
      )}
    </div>
  );
};

export default PreviewOrder;
