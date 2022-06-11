import React from "react";
import { Button, Card, ListGroup, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { buy } from "../store/slices/cart.slice";

const Cart = ({ show, handleClose, handleShow }) => {
  const cartProducts = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
                  Quantity {cartProduct.productsInCart.quantity}
                </Card.Text>
              </ListGroup.Item>
            ))}
            <Button variant="primary" onClick={() => dispatch(buy())}>
              CheckOut
            </Button>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Cart;
