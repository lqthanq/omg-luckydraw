import React from "react";
import logo from "../assets/images/logo.png";
import bg from "../assets/images/bg.png";

export function Wrapper({ children }) {
  const style = {
    maxWidth: 180,
    objectFit: "cover",
    marginTop: "1rem",
    marginLeft: "0.5rem",
    display: "inline-block",
  };
  return (
    <div className="bg-gray-100 h-screen" style={{ background: `url(${bg})`}}>
      <img src={logo} alt="logo" style={style} />
      <div className="w-8/12 mx-auto mt-10">{children}</div>
    </div>
  );
}
