import React from "react";
import logo from "../assets/images/logo.png";
import bg from "../assets/images/bg.png";

export function Wrapper({ children }) {
  const style = {
    maxWidth: 90,
    objectFit: "cover",
    marginTop: "0.5rem",
    marginLeft: "0.5rem",
    display: "inline-block",
  };

  const bgStyle = {
    background: `url(${bg}) no-repeat`,
    backgroundSize: "cover",
  };
  return (
    <div className="bg-gray-100 h-screen" style={bgStyle}>
      <img src={logo} alt="logo" style={style} />
      <div className="w-8/12 mx-auto">{children}</div>
    </div>
  );
}
