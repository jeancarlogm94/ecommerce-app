import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPurchases } from "../store/slices/purchases.slices";
import {
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  NavbarBrand,
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
        <Card style={{ maxWidth: "800px" }} className="mx-auto">
          <Card.Body>
            {purchases.map((purchase) => (
              <ListGroup key={purchase.id} style={{ cursor: "pointer" }}>
                {purchase.cart.products.map((purchaseCart) => (
                  <ListGroupItem
                    key={purchaseCart.id}
                    onClick={() => navigate(`/products/${purchaseCart.id}`)}
                  >
                    {/* <ListGroupItem>{purchaseCart.title}</ListGroupItem> */}
                    <ListGroupItem variant="info">
                      <Card.Title variant="dark">
                        {purchaseCart.title}
                      </Card.Title>
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
