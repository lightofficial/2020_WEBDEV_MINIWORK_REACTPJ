/*--------------------------------------------------------*/

import React, { useState } from "react";
import "../App.css";

/*--------------------------------------------------------*/
//import bootstrap css
/*--------------------------------------------------------*/

import "bootstrap/dist/css/bootstrap.min.css";

/*--------------------------------------------------------*/
//import bootstrap components
/*--------------------------------------------------------*/

import { Nav, Navbar } from "react-bootstrap";
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
} from "reactstrap";

/*--------------------------------------------------------*/

const Topbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [LinearMenu, setLinearMenuOpen] = useState(false);
  const RootOfEquationToggle = () => setDropdownOpen((prevState) => !prevState);
  const LinearMenuToggle = () => setLinearMenuOpen((prevState) => !prevState);

  /*--------------------------------------------------------*/

  return (
    <div>
      <Navbar className="nav-color" variant="dark">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav className="mr-auto">
          <Dropdown isOpen={dropdownOpen} toggle={RootOfEquationToggle}>
            <DropdownToggle color="secondary" caret>
              Root of Equation
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Methods</DropdownItem>
              <DropdownItem href="/Bisection">Bisection Method</DropdownItem>
              <DropdownItem href="/FalsePos">False Position</DropdownItem>
              <DropdownItem href="/OnePoint">One-Point Iteration</DropdownItem>
              <DropdownItem href="/Secant">Secant Method</DropdownItem>
              <DropdownItem href="/NewtonRaphson">Newton Raphson</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <span>&nbsp;&nbsp;</span>
          <Dropdown isOpen={LinearMenu} toggle={LinearMenuToggle}>
            <DropdownToggle color="secondary" caret>
              Linear Algebra
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Methods</DropdownItem>
              <DropdownItem href="/CramersRule">Cramer's Rule</DropdownItem>
              <DropdownItem href="/GaussElimination">
                Gauss Elimination
              </DropdownItem>
              <DropdownItem href="/GaussJordan">
                Gauss-Jordan Elimination
              </DropdownItem>
              <DropdownItem href="/Cholesky">
                Cholesky Decomposition
              </DropdownItem>
              <DropdownItem href="/LUDecompose">LU Decomposition</DropdownItem>
              <DropdownItem href="/GaussSeidel">Gauss-Seidel</DropdownItem>
              <DropdownItem href="/Jacobi">Jacobi Iteration</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <span>&nbsp;&nbsp;</span>
          <Button color="secondary" href="/Newton-Divided-Difference" >Interpolation - Newton-Divided Difference</Button>
          <span>&nbsp;&nbsp;</span>
          <Button color="secondary" href="/Linear-Regression" >Linear Regression Method</Button>
         </Nav>
         <Navbar.Brand href="http://localhost:5000/api-docs/">Swagger</Navbar.Brand>
      </Navbar>
    </div>
  );
};

/*--------------------------------------------------------*/

export default Topbar;

/*--------------------------------------------------------*/
