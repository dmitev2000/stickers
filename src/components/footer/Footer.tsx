import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <span>Made with love, &copy; Dario Mitev.</span>
      <div className="d-flex gap-2">
        <a href="https://github.com/dmitev2000">
          <i className="bi bi-github"></i>
        </a>
        <a href="https://twitter.com/MitevDario">
          <i className="bi bi-twitter"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
