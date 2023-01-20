/*--------------------------------------------------------*/

import React from "react";
import Topbar from "./Topbar";
import Footer from "./Footer";
import logo from "../logo.png";


/*--------------------------------------------------------*/

const Home = () => {
  document.body.style.overflow = "hidden";

  /*--------------------------------------------------------*/

  return (
    <div>
      <Topbar />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>Light Project</code>
        </p>
        <a
          className="App-link"
          href="https://www.binance.com/en"
          target="_blank"
          rel="noopener noreferrer"
        >
          เรียน React ไปทำไม? เป็น Trader สิ!
        </a>
      </header>
      <Footer />
    </div>
  );
};

export default Home;

/*--------------------------------------------------------*/
