import React from "react";
import { Alert, Button, Card, ListGroup, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { checkOut, removeProduct } from "../store/slices/cart.slice";

const Cart = ({ show, handleClose }) => {
  const cartProducts = useSelector((state) => state.cart);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(cartProducts);

  let total = 0;

  if (cartProducts?.length > 0) {
    if (cartProducts?.length > 1) {
      total = cartProducts?.reduce((initial, current) => {
        if (typeof initial === "number") {
          return initial + current.price * current.productsInCart?.quantity;
        } else {
          return (
            initial.price * initial.productsInCart?.quantity +
            current.price * current.productsInCart?.quantity
          );
        }
      });
    } else {
      total =
        cartProducts?.[0].price * cartProducts?.[0].productsInCart?.quantity;
    }
  }

  return (
    <div>
      <Offcanvas show={show} placement="end" onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Alert className="mx-auto px-5">
            <Card.Title>Purchases in my Cart</Card.Title>
          </Alert>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            {cartProducts.map((cartProduct) => (
              <ListGroup.Item
                className="py-4"
                key={cartProduct.id}
                // style={{ cursor: "pointer" }}
                // onClick={() => navigate(`/products/${cartProduct.id}`)}
                // onHide={handleClose}
              >
                <Card.Title>
                  <Card.Title>{cartProduct.title}</Card.Title>
                </Card.Title>

                <Card.Text>
                  Total price $
                  {cartProduct.price * cartProduct.productsInCart.quantity}
                </Card.Text>
                <Card.Text>
                  Quantity {cartProduct.productsInCart.quantity}
                </Card.Text>
                {/* <Button
                  variant="primary"
                  onClick={() => dispatch(removeProduct(cartProduct.id))}
                >
                  Remove
                </Button> */}
                <i
                  className="fa-solid fa-trash"
                  style={{
                    color: "#4582ec",
                    cursor: "pointer",
                  }}
                  onClick={() => dispatch(removeProduct(cartProduct.id))}
                ></i>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Card>
            <Card.Text className="m-3">
              <b>Total ${total}</b>
            </Card.Text>
            <Button
              className="my-4 mx-5"
              variant="primary"
              onClick={() => dispatch(checkOut())}
            >
              CheckOut
            </Button>
          </Card>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Cart;
