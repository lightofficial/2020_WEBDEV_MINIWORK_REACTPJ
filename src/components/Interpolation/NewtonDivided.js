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
  const topic = "Newton Divided Difference";
  const [num, setNum] = useState(0);
  const [xValue, setX] = useState([]);
  const [yValue, setY] = useState([]);
  const [pointCount, setpointCount] = useState(0);
  const [interpolatePoint, setinterpolatePoint] = useState([]);
  const [FindX, setFindX] = useState(0);
  const [output, setOutput] = useState([]);

/*--------------------------------------------------------*/

  useEffect(() => {
    document.title = topic;
  }, []);

  /*--------------------------------------------------------*/

  const generate_table = () => {
    return [...Array(parseInt(num || 0)).keys()];
  };

  /*--------------------------------------------------------*/

  const generate_interpoint = () => {
    return [...Array(parseInt(pointCount || 0)).keys()];
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

  const initialPoint = (i, event) => {
    let copy = [...interpolatePoint];
    copy[i] = +event.target.value - 1;
    setinterpolatePoint(copy);
  };

  /*--------------------------------------------------------*/

  const sendToAPI = (e) => {
    e.preventDefault();
    NewtonDivided();
  };
  const NewtonDivided = () => {
    Axios.post("http://localhost:5000/api/NewtonInterpolation", {
      xValue: xValue,
      yValue: yValue,
      interpolatePoint: interpolatePoint,
      FindX: FindX,
    })
      .then((res) => {
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
                <label>
                  Enter Interpolate Points :<span>&nbsp;&nbsp;</span>
                  <input
                    type="number"
                    value={pointCount}
                    onChange={(e) => setpointCount(e.target.value)}
                  />
                </label>

                {generate_interpoint().map((i) => (
                  <div key={i} className="list-group list-group-flush">
                    <div className="list-group-item">
                      <div className="form-row">
                        <div className="form-group col-4">
                          <label>Interpolate Point {i + 1} =</label>
                          <input
                            type="number"
                            onChange={(e) => initialPoint(i, e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <p></p>
                <button type="submit">
                  Submit
                </button>
              </form>
            ) : null}
          </div>
          <p></p>
          <h2>Output</h2>
          F(x) = {output}
        </Container>
      </div>
      <Footer />
    </div>
  );
}

/*--------------------------------------------------------*/