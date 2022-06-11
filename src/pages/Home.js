import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  filterCategory,
  filterHeadline,
  getProducts,
} from "../store/slices/products.slices";
import {
  Button,
  Card,
  Col,
  FormControl,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);

  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
      )
      .then((res) => setCategories(res.data.data.categories));
  }, [dispatch]);

  const filterProducts = () => {
    dispatch(filterHeadline(search));
  };

  // console.log(products);

  const selectCategory = (id) => {
    dispatch(filterCategory(id));
  };

  return (
    <div>
      <Row>
        <Col>
          <ListGroup className="mt-3" style={{ cursor: "pointer" }}>
            {categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => selectCategory(category.id)}
              >
                {category.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          <InputGroup styles={{ margin: "15px" }} className="my-3">
            <FormControl
              placeholder="Search by Product"
              aria-label="Search product"
              aria-describedby="basic-addon2"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <Button
              variant="primary"
              id="button-addon2"
              onClick={filterProducts}
            >
              Button
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((productItem) => (
          <Col key={productItem.id}>
            <Card
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "auto",
                height: "300px",
                maxWidth: "300px",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/products/${productItem.id}`)}
            >
              <Card.Img
                style={{
                  width: "auto",
                  height: "auto",
                  maxHeight: "250px",
                  maxWidth: "200px",
                }}
                src={productItem.productImgs}
              />
            </Card>
            <Card
              style={{
                width: "auto",
                height: "120px",
                maxWidth: "300px",
                cursor: "pointer",
                padding: "10px",
              }}
              onClick={() => navigate(`/products/${productItem.id}`)}
            >
              <Card.Title>{productItem.title}</Card.Title>
              <Card.Text>Price {productItem.price}</Card.Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
