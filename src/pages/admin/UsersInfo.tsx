import React, { useEffect, useState, useContext } from "react";
import Accordion from "@mui/material/Accordion";
import Badge from "@mui/material/Badge";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Person2Icon from '@mui/icons-material/Person2';
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DashboardLoader from "../../components/loader/DashboardLoader";
import ReloadDashboardContext from "../../context/ReloadDashboardContext";
import axios from "axios";
import UsersList from "../../components/users/UsersList";

const StickerRequests = () => {
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
      .get("http://localhost:5000/api/users")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data);
      });
  }, [ReloadCtx.reloadUsers]);

  return (
    <div className="mb-4">
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
              Active customers{" "}
              <Person2Icon style={{ marginLeft: "10px" }} />
            </Badge>
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Overview / Delete users
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
            <p className="text-muted">There are no users.</p>
          ) : (
            <UsersList users={data} />
          )}
          <button
            className="reload-btn fw-bold"
            onClick={() => {
              ReloadCtx.UpdateReloadUsers();
            }}
          >
            Reload
          </button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default StickerRequests;
