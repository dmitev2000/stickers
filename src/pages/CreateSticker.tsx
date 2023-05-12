import { useState, useContext, useRef } from "react";
import BrowseOptions from "../components/browse-options/BrowseOptions";
import { useNavigate } from "react-router-dom";
import {
  FireErrorNotification,
  FireNotification,
} from "../utils/FireNotificiation";
import axios from "axios";
import { AuthenticationContext } from "../context/AuthenticationContext";
import CreateStickerInfo from "../components/stickers/CreateStickerInfo";

const CreateSticker = () => {
  const BASE_URL = "http://localhost:5000/api/stickers";
  const [title, setTitle] = useState("Title");
  const [image, setImage] = useState("");
  const [validImageUrl, setValidImageUrl] = useState(false);
  const [price, setPrice] = useState(0);
  const [tags, setTags] = useState(["Tags"]);
  const [company, setCompany] = useState("Company / creator");
  const priceInputRef = useRef<HTMLInputElement>(null);
  const AuthCtx = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const SubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validImageUrl) {
      console.log("Invalid image url");
      return;
    }
    const newSticker = {
      title: title,
      image: image,
      tags: tags,
      price: price,
      company: company,
      by: AuthCtx.user.username,
    };
    axios
      .post(`${BASE_URL}/add`, newSticker, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${AuthCtx.token}`,
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
          FireErrorNotification(
            `${err.response.data}. To create stickers you must be logged in.`
          );
        }
      });
  };

  const StickerImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setImage(() => url);

    const imageObject = new Image();
    imageObject.onload = () => {
      setValidImageUrl(() => true);
      if (imageObject.src.split(".").pop() === "svg") {
        setPrice(() => 0.9);
        if (priceInputRef.current) {
          priceInputRef.current.value = "0.9";
        }
        return;
      }
      axios
        .post(`${BASE_URL}/calculate-price`, { url: url })
        .then((res) => {
          setPrice(() => +res.data);
          if (priceInputRef.current) {
            priceInputRef.current.value = res.data.toString();
          }
        })
        .catch((err) => console.log(err));
    };
    imageObject.onerror = () => {
      setValidImageUrl(() => false);
      setPrice(() => 0.0);
      if (priceInputRef.current) {
        priceInputRef.current.value = "";
      }
    };
    imageObject.src = url;
  };

  const TagsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = event.target.options;
    const selectedValues: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setTags(selectedValues);
  };

  return (
    <div className="container py-5">
      <BrowseOptions />
      <div className="create-sticker mt-5 py-3">
        <form className="create-sticker-form" onSubmit={SubmitHandler}>
          <input
            type="text"
            id="title"
            placeholder="Title"
            autoComplete="off"
            onChange={(e) => {
              setTitle(() => e.target.value);
            }}
            required
          />
          <input
            type="url"
            id="image"
            placeholder="Sticker image"
            autoComplete="off"
            onChange={StickerImageChange}
            required
          />
          {!image ? (
            <span className="invalid-url">Sticker image required</span>
          ) : validImageUrl ? (
            <span className="valid-url">Valid url</span>
          ) : (
            <span className="invalid-url">
              Invalid url or unsupported format
            </span>
          )}
          <input
            type="text"
            id="company"
            placeholder="Company (creators)"
            autoComplete="off"
            onChange={(e) => {
              setCompany(() => e.target.value);
            }}
            required
          />
          <select required multiple={true} onChange={TagsChange}>
            <option disabled>Sticker type</option>
            <option value="Language">Language</option>
            <option value="Tooling">Tooling</option>
            <option value="Protocol">Protocol</option>
            <option value="Framework">Framework</option>
            <option value="Service">Service</option>
            <option value="Meme">Meme</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="number"
            min={0.1}
            step={0.05}
            id="price"
            placeholder="Price"
            autoComplete="off"
            readOnly={true}
            ref={priceInputRef}
            required
          />
          <input type="submit" value="Save sticker" />
        </form>
        <div className="sticker-preview">
          <div className="demo-sticker">
            <img src={image} id="preview-img" alt="" />
            <div className="demo-sticker-info" style={{ maxWidth: "250px" }}>
              <div
                className="d-flex justify-content-center align-items-center flex-column gap-2 flex-wrap"
              >
                <h3 className="m-0 w-100" style={{fontSize: "2em"}}>{title}</h3>
                <span className="text-center">
                  <i className="bi bi-camera"></i>
                  {company}
                </span>
                <span>
                  <i className="bi bi-bookmark"></i>
                  {tags.toString()}
                </span>
              </div>
              <span className="demo-sticker-price">${price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      <CreateStickerInfo />
    </div>
  );
};

export default CreateSticker;
