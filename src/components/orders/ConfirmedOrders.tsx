import ReloadDashboardContext from "../../context/ReloadDashboardContext";
import DashboardLoader from "../../components/loader/DashboardLoader";
import { FireErrorNotification } from "../../utils/FireNotificiation";
import { AuthContext } from "../../context/AuthenticationContext";
import React, { useEffect, useState, useContext } from "react";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Typography from "@mui/material/Typography";
import { BASE_URL } from "../../utils/API_URLs";
import Accordion from "@mui/material/Accordion";
import Badge from "@mui/material/Badge";
import OrderList from "./OrderList";
import { saveAs } from "file-saver";
import axios from "axios";

const ConfirmedOrders = () => {
  const AuthCtx = useContext(AuthContext);
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
      .get(`${BASE_URL}/orders/get/confirmed`, {
        headers: {
          Authorization: `Bearer ${AuthCtx.state.token}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ReloadCtx.reloadConfirmedOrders, ReloadCtx.reloadPlacedOrders]);

  const ExportToCSV = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    axios
      .get(`${BASE_URL}/orders/export-orders-to-csv`, {
        headers: {
          Authorization: `Bearer ${AuthCtx.state.token}`,
        },
        responseType: "blob",
      })
      .then((res) => {
        const blob = new Blob([res.data], { type: "text/csv" });
        saveAs(blob, `orders_${new Date().toISOString()}.csv`);
      })
      .catch((err) => {
        FireErrorNotification("Export failed. Try again...");
      });
  };

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
          style={{ padding: "10px" }}
        >
          <Typography sx={{ width: "33%", flexShrink: 0, fontWeight: "bold" }}>
            <Badge badgeContent={data.length} color="success">
              Confirmed orders <SummarizeIcon style={{ marginLeft: "10px" }} />
            </Badge>
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            List of all confirmed orders
          </Typography>
          <button
            className="mx-5 export-csv-btn rounded fw-bold"
            onClick={ExportToCSV}
          >
            Export to CSV
          </button>
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
            <p className="text-muted">There are no confirmed orders.</p>
          ) : (
            <OrderList orders={data} view="Admin" />
          )}
          <button
            className="reload-btn fw-bold"
            onClick={() => {
              ReloadCtx.UpdateReloadConfirmedOrders();
            }}
          >
            Reload
          </button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ConfirmedOrders;
