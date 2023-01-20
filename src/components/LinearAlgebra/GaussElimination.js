/*--------------------------------------------------------*/

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Axios from "axios";

/*--------------------------------------------------------*/

import "../../App.css";
import Topbar from "../Topbar";
import Footer from "../Footer";

/*--------------------------------------------------------*/

export default function GaussElimination() {
  const topic = "Gauss Elimination";
  const [output, setOutput] = useState([]);
  const [matrixA, setMatrixA] = useState(
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => null))
  );
  const [matrixB, setMatrixB] = useState(
    Array.from({ length: 1 }, () => Array.from({ length: 3 }, () => null))
  );

  /*--------------------------------------------------------*/

  useEffect(() => {
    document.title = topic;
  }, []);

  /*--------------------------------------------------------*/

  const initialA = (row, column, event) => {
    let copy = [...matrixA];
    copy[row][column] = +event.target.value;
    setMatrixA(copy);
  };

  /*--------------------------------------------------------*/

  const initialB = (row, column, event) => {
    let copy = [...matrixB];
    copy[row][column] = +event.target.value;
    setMatrixB(copy);
  };

  /*--------------------------------------------------------*/

  const gauss_elimination = () => {
    Axios.post("http://localhost:5000/api/GaussElimAPI", {
      matrixA: matrixA,
      matrixB: matrixB,
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
            <Row>
              <Col xs="7">
                X Matrix
                <table>
                  <tbody>
                    {matrixA.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((column, columnIndex) => (
                          <td key={columnIndex}>
                            <input
                              type="number"
                              onChange={(e) =>
                                initialA(rowIndex, columnIndex, e)
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>

              <Col xs="5">
                Y Matrix
                <table>
                  <tbody>
                    {matrixB.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((column, columnIndex) => (
                          <tr key={columnIndex}>
                            <input
                              type="number"
                              onChange={(e) =>
                                initialB(rowIndex, columnIndex, e)
                              }
                            />
                          </tr>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
          </div>
          <p></p>
          <button onClick={gauss_elimination}>
            Find the Solution
          </button>

          <h2>Output</h2>
          {output.map((item, index) => (
            <li key={index}>
              X<sub>{index + 1}</sub> = {item}
            </li>
          ))}
        </Container>
      </div>
      <Footer />
    </div>
  );
}

/*--------------------------------------------------------*/