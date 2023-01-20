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
          X <sub> old </sub>
        </p>
      );
    },
    dataIndex: "x_old",
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

export default function NewtonRaphson() {
  const topic = "Newton Raphson";
  const [equation, setEquation] = useState("x^3-x-1");
  const [btnState, setBtnState] = useState(0);
  let [x_old, setOldX] = useState(1);

  useEffect(() => {
    document.title = topic;
  }, []);

  const handleSubmit = (e) => {
    if (btnState === 0) {
      e.preventDefault();
      newton();
    }
  };

/*--------------------------------------------------------*/

  const newton = () => {
    Axios.post("http://localhost:5000/api/NewtonRaphsonAPI", {
      x_old: parseFloat(x_old),
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
            X :<span>&nbsp;&nbsp;</span>
            {x_old}
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
              X :<span>&nbsp;&nbsp;</span>
              <input
                disabled={btnState}
                type="text"
                value={x_old}
                onChange={(e) => setOldX(e.target.value)}
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