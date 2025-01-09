import React from "react";
import logo from "../logo.png"; // Importing the image

function Logo({ width = "100px" }) {
  return (
    <img src={logo} alt="Logo" style={{ width }} /> // Using the imported image and dynamic width
  );
}

export default Logo;
