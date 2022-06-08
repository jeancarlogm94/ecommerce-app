import React, { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getCart } from "../store/slices/cart.slice";

const NavBar = () => {
  const logOut = () => {
    localStorage.setItem("token", "");
    alert("Closed session");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">e-commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href="/#/login">Login</Nav.Link>
              <Nav.Link href="/#/purchases">Purchases</Nav.Link>
              <Nav.Link href="/#/cart">Cart</Nav.Link>
              <Nav.Link href="/#/login" onClick={logOut}>
                Log Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
