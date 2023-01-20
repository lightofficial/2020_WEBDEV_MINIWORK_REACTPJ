/*--------------------------------------------------------*/

import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Table } from "antd";
import Axios from "axios";

/*--------------------------------------------------------*/

import "../../App.css";
import Topbar from "../Topbar";
import Footer from "../Footer";

/*--------------------------------------------------------*/

const header = [
  {
    title: () => {
      return <p> Iteration </p>;
    },
    dataIndex: "iteration",
    key: "iteration",
    align: "center",
  },
  {
    title: () => {
      return (
        <p>
          {" "}
          X <sub> 0 </sub>
        </p>
      );
    },
    dataIndex: "x0",
    align: "center",
    width: 300,
  },
  {
    title: () => {
      return (
        <p>
          {" "}
          X <sub> 1 </sub>
        </p>
      );
    },
    dataIndex: "x1",
    align: "center",
    width: 300,
  },
  {
    title: () => {
      return (
        <p>
          {" "}
          X <sub> new </sub>
        </p>
      );
    },
    dataIndex: "x_new",
    align: "center",
    width: 300,
  },
  {
    title: "Error",
    dataIndex: "Error",
    align: "center",
    width: 300,
  },
];

/*--------------------------------------------------------*/

var newArr = [];

/*--------------------------------------------------------*/

export default function Secant() {
  const topic = "Secant Method";
  const [equation, setEquation] = useState("x^3 - 2*x - 5");
  const [btnState, setBtnState] = useState(0);
  let [x0, setXL] = useState(1);
  let [x1, setXR] = useState(2);

  useEffect(() => {
    document.title = topic;
  }, []);

  const handleSubmit = (e) => {
    if (btnState === 0) {
      e.preventDefault();
      secant();
    }
  };

  const secant = () => {
    Axios.post("http://localhost:5000/api/SecantAPI", {
      x0: parseFloat(x0),
      x1: parseFloat(x1),
      equation: equation,
    })
      .then((res) => {
        console.log(res.data.tmpArr);
        newArr = res.data.tmpArr;
        setBtnState(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /*--------------------------------------------------------*/

  return (
    <div>
      <Topbar />
      <p></p>
      <div>
        <Container>
          <h1>
            <code>{topic}</code>
          </h1>
          <p>
            Equation :<span>&nbsp;&nbsp;</span>
            {equation}
          </p>
          <p>
            X<sub>0</sub> :<span>&nbsp;&nbsp;</span>
            {x0}
          </p>
          <p>
            X<sub>1</sub> :<span>&nbsp;&nbsp;</span>
            {x1}
          </p>

          <form onSubmit={handleSubmit}>
            <label>
              Equation :<span>&nbsp;&nbsp;</span>
              <input
                disabled={btnState}
                type="text"
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
              />
            </label>
            <p></p>
            <label>
              X<sub>0</sub> :<span>&nbsp;&nbsp;</span>
              <input
                disabled={btnState}
                type="text"
                value={x0}
                onChange={(e) => setXL(e.target.value)}
              />
            </label>
            <p></p>
            <label>
              X<sub>1</sub> :<span>&nbsp;&nbsp;</span>
              <input
                disabled={btnState}
                type="text"
                value={x1}
                onChange={(e) => setXR(e.target.value)}
              />
            </label>
            <p></p>

            {btnState === 0 ? (
              <button type="submit">
                Submit
              </button>
            ) : (
              <button type="submit">
                Reset
              </button>
            )}
          </form>
          <p></p>
          <p></p>
          <div>
            {
              <Table
                dataSource={newArr}
                columns={header}
                rowKey="iteration"
                pagination={false}
              />
            }
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

/*--------------------------------------------------------*/