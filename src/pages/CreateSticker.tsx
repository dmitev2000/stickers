import { useState } from "react";
import BrowseOptions from "../components/browse-options/BrowseOptions";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import axios from "axios";

const CreateSticker = () => {
  const BASE_URL = "http://localhost:5000/api/stickers/";
  const [title, setTitle] = useState("Title");
  const [image, setImage] = useState(
    "https://p7.hiclipart.com/preview/92/27/596/question-mark-business-information-clip-art-pictures-of-question-marks.jpg"
  );
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("Type");
  const [company, setCompany] = useState("Company");
  const navigate = useNavigate();  

  const SubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newSticker = {
      title: title,
      image: image,
      sticker_type: type,
      price: price,
      company: company,
    };
    axios
      .post(`${BASE_URL}/add`, newSticker)
      .then((res) => {
        //console.log(res.data);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast: any) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "success",
          title: "Your sticker has been created.",
        });
        navigate("/");
      })
      .catch((err) => console.error(err));
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
            onChange={(e) => {
              setImage(() => e.target.value);
            }}
            required
          />
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
          <select
            required
            onChange={(e) => {
              setType(() => e.target.value);
            }}
          >
            <option>Sticker type</option>
            <option value="Language">Language</option>
            <option value="Tooling">Tooling</option>
            <option value="Protocol">Protocol</option>
            <option value="Framework">Framework</option>
            <option value="Service">Service</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="number"
            min={0.1}
            step={0.1}
            id="price"
            placeholder="Price"
            autoComplete="off"
            onChange={(e) => {
              setPrice(() => +e.target.value);
            }}
            required
          />
          <input type="submit" value="Save sticker" />
        </form>
        <div className="sticker-preview">
          <div className="demo-sticker">
            <img src={image} alt="" />
            <div className="demo-sticker-info">
              <h3>{title}</h3>
              <div
                style={{ maxWidth: "250px" }}
                className="d-flex justify-content-evenly flex-wrap"
              >
                <span>
                  <i className="bi bi-camera"></i>
                  {company}
                </span>
                <span>
                  <i className="bi bi-bookmark"></i>
                  {type}
                </span>
              </div>
              <span className="demo-sticker-price">${price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSticker;
