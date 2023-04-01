const StickerFIlter = () => {
  return (
    <div className="my-5 d-flex justify-content-center gap-4 align-items-center flex-wrap">
        <i style={{fontSize: "25px", color: "#ff1867"}} className="bi bi-bookmark"></i>
        <button className="filter-btn">Language</button>
        <button className="filter-btn">Tooling</button>
        <button className="filter-btn">Service</button>
        <button className="filter-btn">Framework</button>
        <button className="filter-btn">Protocol</button>
    </div>
  )
}

export default StickerFIlter;