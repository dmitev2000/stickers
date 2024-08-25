import { useContext, useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import { AuthContext } from "../context/AuthenticationContext";
import axios from "axios";
import {
  IRejectedSticker,
  IUserStickersResponse,
  Sticker,
} from "../interfaces/Interfaces";
import UsersRejected from "../components/stickers/UsersRejected";
import Card from "@mui/material/Card";
import { Badge, Divider } from "@mui/material";
import UsersValid from "../components/stickers/UsersValid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const MyStickers = () => {
  const [rData, setRData] = useState<IRejectedSticker[]>([]);
  const [vData, setVData] = useState<Sticker[]>([]);
  const [loading, setLoading] = useState(true);
  const AuthCtx = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/rejected/get/${AuthCtx.state.user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${AuthCtx.state.token}`,
          },
        }
      )
      .then((res) => {
        const data: IUserStickersResponse = res.data;
        setRData(data.rejectedStickers);
        setVData(data.validStickers);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loader-wrapper2">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container">
      <h3 className="my-5 dashboard-h">My Stickers</h3>
      <Card sx={{ padding: "20px", marginBottom: "25px" }}>
        <Badge badgeContent={vData.length ?? 0} color="success" showZero>
          <h4 className="dashboard-h">Valid</h4>
          <CheckCircleIcon color="success" />
        </Badge>
        {vData && vData.length > 0 ? (
          <UsersValid data={vData} />
        ) : (
          <p className="fst-italic">Nothing to show.</p>
        )}
      </Card>

      <Card sx={{ padding: "20px", marginBottom: "25px" }}>
        <Badge badgeContent={rData.length ?? 0} color="error" showZero>
          <h4 className="dashboard-h">Rejected</h4>
          <HighlightOffIcon color="error" />
        </Badge>
        {rData && rData.length > 0 ? (
          <UsersRejected data={rData} />
        ) : (
          <p className="fst-italic">Nothing to show.</p>
        )}
      </Card>
    </div>
  );
};

export default MyStickers;
