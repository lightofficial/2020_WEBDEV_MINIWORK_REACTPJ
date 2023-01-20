/*--------------------------------------------------------*/

import React from "react";

/*--------------------------------------------------------*/

const footerStyle = {
  backgroundColor: "#ba9f34",
  fontSize: "25px",
  color: "white",
  textAlign: "center",
  padding: "30px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "80px",
  width: "100%",
};

/*--------------------------------------------------------*/

const phantomStyle = {
  display: "block",
  padding: "20px",
  height: "120px",
  width: "100%",
};

/*--------------------------------------------------------*/

const Footer = () => {
  return (
    <div>
      <div style={phantomStyle} />
      <div style={footerStyle}>
        <span>
           ชื่อ : นายธนัท พรหมพิริยา รหัสนักศึกษา : 6104062630077
        </span>
      </div>
    </div>
  );
};
export default Footer;

/*--------------------------------------------------------*/
