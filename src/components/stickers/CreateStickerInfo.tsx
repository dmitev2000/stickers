import "bootstrap/dist/js/bootstrap.min.js";

const CreateStickerInfo = () => {
  return (
    <div className="create-sticker-info mt-5">
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button fw-bold"
              style={{ backgroundColor: "#ff1867", color: "white" }}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Feature
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <p>
                With our new <strong>sticker creation feature</strong>, you can
                design your own unique stickers and earn a share of the profits
                every time one of your stickers is sold! For every sticker you
                create and sell,
                <strong> you will receive 1% of the total profit</strong> gained
                from its sales.
              </p>
              <p>
                Once you're satisfied with your design, you can submit it for
                review by our team. We'll make sure your sticker meets our
                quality standards and is appropriate for our platform. Once
                approved, your sticker will be available for sale on our
                marketplace, and you'll start earning a share of the profits
                every time someone purchases it.
              </p>
              <p>
                Creating stickers is a fun and creative way to express yourself,
                and now you can turn that creativity into profit! So why not
                give it a try and start designing your own stickers today?
              </p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed fw-bold"
              style={{ backgroundColor: "white", color: "#ff1867" }}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Guidelines
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <p>
                To ensure that our sticker marketplace remains a high-quality
                and professional platform, we have a few guidelines for creating
                and selling stickers.
              </p>
              <p>
                First and foremost, all stickers must be related to{" "}
                <strong>programming or technology</strong> in some way. This
                could be a reference to a programming language, a popular
                software tool, or a humorous nod to a common coding challenge.
                We want to ensure that our stickers are relevant and useful to
                our audience of programmers and tech enthusiasts.
              </p>
              <p>
                In addition, all stickers must meet our quality standards in
                terms of design and content. Stickers should be{" "}
                <strong>original and creative</strong>, and should not violate
                any intellectual property or copyright laws. We also reserve the
                right to reject any stickers that are offensive or
                inappropriate.
              </p>
              <p>
                Finally, all stickers will be priced based on the complexity of
                the design and the cost of producing the physical sticker. We
                use a formula to calculate the price of each sticker based on
                factors such as the size, shape, and colors used in the design.
                This means that the more intricate and detailed the design, the
                higher the price will be.
              </p>
              <p>
                By following these guidelines, you can create high-quality and
                professional stickers that are sure to appeal to our audience of
                programming and tech enthusiasts. So why not put your creativity
                to the test and start designing your own stickers today?
              </p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed fw-bold"
              style={{ backgroundColor: "white", color: "#ff1867" }}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Pricing
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <p>
                The price of each sticker in our marketplace is calculated
                automatically based on the image itself. This means that the
                price of a sticker cannot be set by the user, but is instead
                determined by <strong>our pricing algorithm</strong>.
              </p>
              <p>
                By automatically calculating the price of each sticker, we
                ensure that our marketplace remains fair and competitive for
                both buyers and sellers. So why not start designing your own
                stickers today and see how our pricing algorithm calculates the
                price of your creation?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStickerInfo;
