import React from "react";
import { Card, ListGroup, Offcanvas } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = ({ show, handleClose, handleShow }) => {
  const cartProducts = useSelector((state) => state.cart);
  const navigate = useNavigate();

  return (
    <div>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            {cartProducts.map((cartProduct) => (
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                key={cartProduct.id}
                onClick={() => navigate(`/products/${cartProduct.id}`)}
              >
                <h5>{cartProduct.title}</h5>
                <Card.Text>Price {cartProduct.price}</Card.Text>
                <Card.Text>
                  Cantidad {cartProduct.productsInCart.quantity}
                </Card.Text>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Cart;
