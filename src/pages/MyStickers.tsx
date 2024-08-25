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
import { Divider } from "@mui/material";
import UsersValid from "../components/stickers/UsersValid";

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
        <h4 className="dashboard-h">My valid stickers</h4>
        <UsersValid data={vData} />
      </Card>

      <Card sx={{ padding: "20px", marginBottom: "25px" }}>
        <h4 className="dashboard-h">My rejected stickers</h4>
        <UsersRejected data={rData} />
      </Card>
    </div>
  );
};

export default MyStickers;
