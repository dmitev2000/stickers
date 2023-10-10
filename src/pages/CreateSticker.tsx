import { useState, useContext, useRef } from "react";
import BrowseOptions from "../components/browse-options/BrowseOptions";
import { useNavigate } from "react-router-dom";
import {
  FireErrorNotification,
  FireNotification,
} from "../utils/FireNotificiation";
import axios from "axios";
import { AuthContext } from "../context/AuthenticationContext";
import CreateStickerInfo from "../components/stickers/CreateStickerInfo";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";

const CreateSticker = () => {
  const BASE_URL = "http://localhost:5000/api/stickers";
  const AuthCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const tagsVal = [
    "OS",
    "Tooling",
    "Framework",
    "Service",
    "Protocol",
    "Language",
    "Other",
  ];

  const [title, setTitle] = useState("Title");
  const [img, setImg] = useState<string | undefined>(undefined);
  const [tag, setTag] = useState<string[]>([]);
  const [company, setCompany] = useState("Company/creator");

  const SubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    axios
      .post(`${BASE_URL}/add`, formData, {
        headers: {
          Authorization: `Bearer ${AuthCtx.state.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        FireNotification("Your sticker has been created.");
        navigate("/");
      })
      .catch((err) => {
        if (err.response.data.toString().includes("duplicate key")) {
          FireErrorNotification(
            `This sticker is already created. Create another one or change its title or image.`
          );
        } else {
          FireErrorNotification(`${err.response.data}`);
        }
      });
  };

  const HandleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImg(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImg(undefined);
    }
  };

  const TagChange = (event: SelectChangeEvent<typeof tag>) => {
    const {
      target: { value },
    } = event;
    setTag(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className="container py-5">
      <BrowseOptions />
      <div className="create-sticker mt-5 py-3">
        <form
          className="create-sticker-form"
          id="create-sticker-form"
          onSubmit={SubmitHandler}
          encType="multipart/form-data"
        >
          <TextField
            label="Title"
            variant="outlined"
            id="title"
            name="title"
            onChange={(e) => {
              setTitle(() => e.target.value);
            }}
            autoComplete="off"
            fullWidth
            required
          />
          <input
            type="file"
            accept="image/*"
            name="image"
            required
            onChange={HandleImageChange}
          />
          <TextField
            name="company"
            id="company"
            label="Company"
            autoComplete="off"
            fullWidth
            onChange={(e) => {
              setCompany(() => e.target.value);
            }}
            required
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tags</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              multiple
              label="Tag"
              value={tag}
              onChange={TagChange}
              name="tag"
            >
              {tagsVal.map((t, i) => {
                return (
                  <MenuItem value={t} key={i}>
                    {t}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <input type="submit" value="Save sticker" />
        </form>
        <div className="sticker-preview">
          <div className="demo-sticker">
            <img src={img} id="preview-img" alt="" />
            <div className="demo-sticker-info" style={{ maxWidth: "250px" }}>
              <div className="d-flex justify-content-center align-items-center flex-column gap-2 flex-wrap">
                <h3 className="m-0 w-100" style={{ fontSize: "2em" }}>
                  {title}
                </h3>
                <span className="text-center">
                  <i className="bi bi-camera"></i>
                  {company}
                </span>
                <span>
                  <i className="bi bi-bookmark"></i>
                  {tag.length === 0 ? "Tag" : tag.toString()}
                </span>
              </div>
              <span className="demo-sticker-price">
                Price will be calculated afterwards
              </span>
            </div>
          </div>
        </div>
      </div>
      <CreateStickerInfo />
    </div>
  );
};

export default CreateSticker;
