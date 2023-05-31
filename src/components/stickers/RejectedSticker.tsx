import { useState } from "react";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const RejectedSticker = ({ item }: { item: any }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <tr className="pending-row">
      <td>
        <img
          style={{ width: "100px", height: "100px" }}
          src={item.sticker.image}
        />
      </td>
      <td>
        <div
          className="d-flex align-items-center"
          style={{ minHeight: "100px" }}
        >
          {item.sticker.title}
        </div>
      </td>
      <td>
        <div
          className="d-flex align-items-center"
          style={{ minHeight: "100px" }}
        >
          ${item.sticker.price}
        </div>
      </td>
      <td>
        <div
          className="d-flex align-items-center"
          style={{ minHeight: "100px" }}
        >
          {item.sticker.tags.toString()}
        </div>
      </td>
      <td>
        <div
          className="d-flex align-items-center"
          style={{ minHeight: "100px" }}
        >
          {item.sticker.by}
        </div>
      </td>
      <td>
        <div
          className="d-flex align-items-center"
          style={{ minHeight: "100px" }}
        >
          {item.sticker.createdAt
            .toString()
            .substring(0, 19)
            .split("T")
            .join(" ")}
        </div>
      </td>
      <td>
        <div
          className="d-flex align-items-center"
          style={{ minHeight: "100px" }}
        >
          <Tooltip title="View reason">
            <button className="reload-btn" onClick={handleClickOpen}>
              <HelpCenterIcon />
            </button>
          </Tooltip>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Rejected sticker</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <b>{item.reason}</b>
                <br />
                <br />
                Our goal is to create a community of passionate programmers who
                can express their love for coding through our unique and
                high-quality stickers. Please note that we only accept sticker
                submissions that are related to programming or software
                development. This means that stickers should feature programming
                languages, tools, frameworks, or other related concepts.
                <br />
                <br />
                We appreciate your understanding and look forward to seeing your
                creative and unique programming-related stickers in our
                marketplace!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
      </td>
    </tr>
  );
};

export default RejectedSticker;
