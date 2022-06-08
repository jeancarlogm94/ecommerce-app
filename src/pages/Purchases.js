import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPurchases } from "../store/slices/purchases.slices";
import { Col, ListGroup, Row } from "react-bootstrap";

const Purchases = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurchases());
  }, [dispatch]);

  return (
    <Row>
      <Col>
        {purchases.map((purchase) => (
          <ListGroup key={purchase.id} style={{ cursor: "pointer" }}>
            {purchase.cart.products.map((product) => (
              <ListGroup.Item
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
              >
                {product.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ))}
      </Col>
    </Row>
  );
};

export default Purchases;
