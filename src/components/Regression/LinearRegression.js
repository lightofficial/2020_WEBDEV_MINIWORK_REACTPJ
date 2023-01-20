/*--------------------------------------------------------*/

import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Axios from "axios";

/*--------------------------------------------------------*/

import "../../App.css";
import Topbar from "../Topbar";
import Footer from "../Footer";

/*--------------------------------------------------------*/

export default function NewtonDivided() {
  const topic = "Linear Regression";
  const [num, setNum] = useState(0);
  const [xValue, setX] = useState([]);
  const [yValue, setY] = useState([]);
  const [FindX, setFindX] = useState(0);
  const [equation, setEquation] = useState("");
  const [output, setOutput] = useState(0);

  /*--------------------------------------------------------*/

  useEffect(() => {
    document.title = topic;
  }, []);

  /*--------------------------------------------------------*/

  const generate_table = () => {
    return [...Array(parseInt(num || 0)).keys()];
  };

  /*--------------------------------------------------------*/

  const initialX = (i, event) => {
    let copy = [...xValue];
    copy[i] = +event.target.value;
    setX(copy);
  };

  /*--------------------------------------------------------*/

  const initialY = (i, event) => {
    let copy = [...yValue];
    copy[i] = +event.target.value;
    setY(copy);
  };

  /*--------------------------------------------------------*/

  const sendToAPI = (e) => {
    e.preventDefault();
    Regression();
  };
  const Regression = () => {
    Axios.post("http://localhost:5000/api/LinearRegressionAPI", {
      xValue: xValue,
      yValue: yValue,
      FindX: FindX,
    })
      .then((res) => {
        setEquation(res.data.equation);
        setOutput(res.data.out);
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
          <p></p>
          <p></p>
          <div>
            <label>
              Enter number of Variable :<span>&nbsp;&nbsp;</span>
              <input
                type="number"
                value={num}
                onChange={(e) => setNum(e.target.value)}
              />
            </label>
            <p></p>
            {num > 0 ? (
              <form onSubmit={sendToAPI}>
                <p></p>
                {generate_table().map((i) => (
                  <div key={i} className="list-group list-group-flush">
                    <div className="list-group-item">
                      <div className="form-row">
                        <div className="form-group col-4">
                          <label>
                            X<sub>{i}</sub> =
                          </label>
                          <input
                            type="number" step="any"
                            onChange={(e) => initialX(i, e)}
                          />
                        </div>
                        <div className="form-group col-4">
                          <label>
                            F(x<sub>{i}</sub>) =
                          </label>
                          <input
                            type="number" step="any"
                            onChange={(e) => initialY(i, e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <p></p>
                <label>
                  Find value at X<sub>i</sub> :<span>&nbsp;&nbsp;</span>
                  <input
                    type="number"
                    value={FindX}
                    onChange={(e) => setFindX(e.target.value)}
                  />
                </label>
                <p></p>
                <button type="submit">
                  Submit
                </button>
              </form>
            ) : null}
          </div>
          <p></p>
          <h2>Output</h2>
          Equation  in y = mx+b is {equation}
          <p></p>
          F(x) = {output}
        </Container>
      </div>
      <Footer />
    </div>
  );
}

/*--------------------------------------------------------*/
