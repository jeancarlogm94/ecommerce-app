import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPurchases } from "../store/slices/purchases.slices";
import {
  Alert,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import DatePurchase from "../components/DatePurchase";

const Purchases = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurchases());
  }, [dispatch]);

  // console.log(purchases);

  return (
    <Row>
      <Col>
        <Card>
          <Card.Body
            style={{ textAlign: "center", maxWidth: "400px" }}
            className="mt-5 mx-auto"
          >
            <Card.Title className="mb-3">My Purchases</Card.Title>
            {purchases.map((purchase) => (
              <ListGroup key={purchase.id} style={{ cursor: "pointer" }}>
                {purchase.cart.products.map((purchaseCart) => (
                  <ListGroupItem
                    key={purchaseCart.id}
                    onClick={() => navigate(`/products/${purchaseCart.id}`)}
                  >
                    {/* <ListGroupItem>{purchaseCart.title}</ListGroupItem> */}
                    <Alert>
                      <Card.Title>{purchaseCart.title}</Card.Title>
                    </Alert>
                    <ListGroupItem>
                      <DatePurchase purchase={purchase}></DatePurchase>
                    </ListGroupItem>
                    <ListGroupItem>Price {purchaseCart.price}</ListGroupItem>
                    <ListGroupItem>
                      Quantity {purchaseCart.productsInCart.quantity}
                    </ListGroupItem>
                  </ListGroupItem>
                ))}
              </ListGroup>
            ))}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Purchases;
