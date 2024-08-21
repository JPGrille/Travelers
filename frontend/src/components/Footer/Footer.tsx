import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <div className="bottom-container">
      <ul className="social_icon">
        <li><a href="#">FB</a></li>
        <li><a href="#">TW</a></li>
        <li><a href="#">LinkedIn</a></li>
        <li><a href="#">IG</a></li>
      </ul>
      <ul className="menu">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Team</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <p className="copyright">© 2024 Juan Pedro Grille.</p>
    </div>
  );
}

export default Footer;