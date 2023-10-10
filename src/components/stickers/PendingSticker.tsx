import { useState, useContext } from "react";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CancelIcon from "@mui/icons-material/Cancel";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { FireNotification } from "../../utils/FireNotificiation";
import ReloadDashboardContext from "../../context/ReloadDashboardContext";

const PendingSticker = ({ item }: { item: any }) => {
  const ReloadCtx = useContext(ReloadDashboardContext);
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setReason("");
    setOpen(false);
  };

  const ReviewSticker = () => {
    var status = "Valid";
    if (reason) {
      status = "Rejected";
    }
    axios
      .post("http://localhost:5000/api/stickers/update-status", {
        sticker: {
          _id: item._id,
          title: item.title,
        },
        status: status,
        reason: reason,
      })
      .then((res) => {
        FireNotification(res.data);
        setOpen(false);
        ReloadCtx.UpdateReloadPendingStickers();
        if (status === "Rejected") {
          ReloadCtx.UpdateReloadRejectedStickers();
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <tr className="pending-row">
      <td>
        <img
          style={{ width: "100px", height: "100px" }}
          src={`http://localhost:5000/uploads/${item.image}`}
        />
      </td>
      <td>
        <div
          className="d-flex align-items-center"
          style={{ minHeight: "100px" }}
        >
          {item.title}
        </div>
      </td>
      <td>
        <div
          className="d-flex align-items-center"
          style={{ minHeight: "100px" }}
        >
          ${item.price.toFixed(2)}
        </div>
      </td>
      <td>
        <div
          className="d-flex align-items-center"
          style={{ minHeight: "100px" }}
        >
          {item.tags.toString()}
        </div>
      </td>
      <td>
        <div
          className="d-flex align-items-center"
          style={{ minHeight: "100px" }}
        >
          {item.by}
        </div>
      </td>
      <td>
        <div
          className="d-flex align-items-center"
          style={{ minHeight: "100px" }}
        >
          {item.createdAt.toString().substring(0, 19).split("T").join(" ")}
        </div>
      </td>
      <td>
        <div
          className="d-flex align-items-center"
          style={{ minHeight: "100px" }}
        >
          <Tooltip title="Confirm">
            <button className="approve rounded" onClick={ReviewSticker}>
              <AddTaskIcon />
            </button>
          </Tooltip>
          <Tooltip title="Reject">
            <button className="decline rounded" onClick={handleClickOpen}>
              <CancelIcon />
            </button>
          </Tooltip>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Reject sticker</DialogTitle>
            <DialogContent>
              <DialogContentText style={{ marginBottom: "10px" }}>
                Please enter a brief reason for the rejection in the text box
                below. Once you have done so, click the "Confirm" button to send
                the feedback to the user and remove the sticker from the
                marketplace.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="reason"
                label="Reason"
                type="text"
                fullWidth
                variant="standard"
                required
                onChange={(e) => {
                  setReason(e.target.value);
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button disabled={reason.length < 20} onClick={ReviewSticker}>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </td>
    </tr>
  );
};

export default PendingSticker;
