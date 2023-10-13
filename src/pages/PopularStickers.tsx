import BrowseOptions from "../components/browse-options/BrowseOptions";
import Loader from "../components/loader/Loader";

const PopularStickers = () => {
  return (
    <div className="container py-5">
      <BrowseOptions />
      <div className="favs-coming-soon">
        <Loader />
      </div>
    </div>
  );
};

export default PopularStickers;
