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

  const filterNews = () => {
    dispatch(filterHeadline(search));
  };

  // console.log(products);

  const selectCategory = (id) => {
    dispatch(filterCategory(id));
  };

  return (
    <div>
      <h1>Products</h1>

      <Row>
        <Col>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search product"
              aria-label="Search product"
              aria-describedby="basic-addon2"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <Button variant="dark" id="button-addon2" onClick={filterNews}>
              Button
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          <ListGroup style={{ cursor: "pointer" }}>
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

      <Row xs={1} md={2} lg={3} className="g-4">
        {products.map((productItem) => (
          <Col key={productItem.id}>
            <Card
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/products/${productItem.id}`)}
            >
              <Card.Img
                style={{ maxWidth: "250PX", maxHeight: "500px" }}
                variant="top"
                src={productItem.productImgs[2]}
              />
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
