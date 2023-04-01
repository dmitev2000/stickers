import BrowseOptions from "../components/browse-options/BrowseOptions";
import Loader from "../components/loader/Loader";

const FavoriteStickers = () => {
  return (
    <div className="container py-5">
        <BrowseOptions />
        <div className="favs-coming-soon">
          <Loader />
          <h3>Coming soon</h3>
        </div>
    </div>
  )
}

export default FavoriteStickers;