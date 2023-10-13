import { useState, useContext } from "react";
import {
  PlacedOrderInterface,
  StickerDetails,
} from "../../interfaces/Interfaces";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import HomeIcon from "@mui/icons-material/Home";
import Person3Icon from "@mui/icons-material/Person3";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import axios from "axios";
import StickerTable from "../stickers/StickerTable";
import {
  FireErrorNotification,
  FireNotification,
} from "../../utils/FireNotificiation";
import ReloadDashboardContext from "../../context/ReloadDashboardContext";
import { AuthContext } from "../../context/AuthenticationContext";

const PlacedOrder = ({ order }: { order: PlacedOrderInterface }) => {
  const [openProducts, setOpenProducts] = useState(false);
  const [openShippingDetails, setOpenShippingDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stickerDetails, setStickerDetails] = useState<null | StickerDetails[]>(
    null
  );
  const ReloadCtx = useContext(ReloadDashboardContext);
  const AuthCtx = useContext(AuthContext);

  const handleClickOpenP = () => {
    setOpenProducts(true);
    GetStickers();
  };

  const handleCloseP = () => {
    setOpenProducts(false);
  };

  const handleClickOpenSD = () => {
    setOpenShippingDetails(true);
  };

  const handleCloseSD = () => {
    setOpenShippingDetails(false);
  };

  const GetStickers = () => {
    if (order === undefined || stickerDetails !== null) {
      return;
    }
    axios
      .post("http://localhost:5000/api/stickers/stickers-from-order", {
        stickerIDs: order.stickerList,
      })
      .then((res) => {
        setStickerDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ConfirmOrder = () => {
    axios
      .post(
        "http://localhost:5000/api/orders/confirm",
        {
          order_id: order._id,
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
        ReloadCtx.UpdateReloadPlacedOrders();
      })
      .catch((err) => FireErrorNotification(err.response.data));
  };

  return (
    <tr>
      <td>
        <div
          className="d-flex align-items-center"
          style={{ minHeight: "50px" }}
        >
          {order._id}
        </div>
      </td>
      <td>
        <div
          className="d-flex align-items-center"
          style={{ minHeight: "50px" }}
        >
          ${order.totalPrice.toFixed(2)}
        </div>
      </td>
      <td>
        <div
          className="d-flex align-items-center"
          style={{ minHeight: "50px" }}
        >
          {order.createdAt.substring(0, 10)}
          <br />
          {order.createdAt.substring(11, 19)}
        </div>
      </td>
      <td className="text-center">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "50px" }}
        >
          <Tooltip title="View products">
            <button className="reload-btn" onClick={handleClickOpenP}>
              <ShoppingBasketIcon />
            </button>
          </Tooltip>
          <Dialog open={openProducts} onClose={handleCloseP}>
            <DialogTitle>Products</DialogTitle>
            <DialogContent>
              {loading ? (
                <DialogContentText>Loading ...</DialogContentText>
              ) : (
                <>
                  <StickerTable
                    stickers={stickerDetails}
                    totalPrice={order.totalPrice}
                  />
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseP}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
      </td>
      <td className="text-center">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "50px" }}
        >
          <Tooltip title="Shipping details">
            <button className="reload-btn" onClick={handleClickOpenSD}>
              <LocalShippingIcon />
            </button>
          </Tooltip>
          <Dialog open={openShippingDetails} onClose={handleCloseSD}>
            <DialogTitle>Shipping Details</DialogTitle>
            <DialogContent>
              <List
                sx={{
                  width: "400px",
                  bgcolor: "background.paper",
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Person3Icon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Full name"
                    secondary={order.shippingDetails.fullname}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <LocationCityIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="City"
                    secondary={order.shippingDetails.city}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <HomeIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Address"
                    secondary={order.shippingDetails.address}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PhoneAndroidIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Phone number"
                    secondary={order.shippingDetails.phone_number}
                  />
                </ListItem>
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseSD}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
      </td>
      <td className="text-center">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "50px" }}
        >
          <Tooltip title="Confirm">
            <button className="approve rounded" onClick={ConfirmOrder}>
              <AddTaskIcon />
            </button>
          </Tooltip>
        </div>
      </td>
    </tr>
  );
};

export default PlacedOrder;
