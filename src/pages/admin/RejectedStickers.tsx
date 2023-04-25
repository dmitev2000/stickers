import React, { useEffect, useState, useContext } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import DashboardLoader from "../../components/loader/DashboardLoader";
import ReloadDashboardContext from "../../context/ReloadDashboardContext";
import RejectedStickerList from "../../components/stickers/RejectedStickerList";

const RejectedStickers = () => {
  const ReloadCtx = useContext(ReloadDashboardContext);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    setError(null);
    axios
      .get("http://localhost:5000/api/rejected/get")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data);
      });
  }, [ReloadCtx.reloadRejectedStickers]);

  return (
    <div className="my-4">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          style={{padding: "10px"}}
        >
          <Typography sx={{ width: "33%", flexShrink: 0, fontWeight: "bold" }}>
            Rejected stickers
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            List of all rejected (inappropriate) stickers
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center py-5">
              <DashboardLoader />
            </div>
          ) : error ? (
            <div className="d-flex align-items-center gap-5">
              <p className="text-danger m-0">{error}</p>
            </div>
          ) : data.length === 0 ? (
            <p className="text-muted">There are no rejected sticker requests.</p>
          ) : (
            <RejectedStickerList list={data} />
          )}
          <button
            className="btn btn-warning"
            onClick={() => {
              ReloadCtx.UpdateReloadRejectedSrtickers();
            }}
          >
            Reload component
          </button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default RejectedStickers;
