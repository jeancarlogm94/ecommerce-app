import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { filterCategory } from "../store/slices/products.slices";
import {
  // Button,
  Card,
  Col,
  // FormControl,
  // InputGroup,
  // ListGroup,
  Row,
} from "react-bootstrap";

const Product = () => {
  const [productItem, setProductItem] = useState({});
  const { id } = useParams();

  const dispatch = useDispatch();

  // const products = useSelector((state) => state.product);

  useEffect(() => {
    // axios
    //   .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}`)
    //   .then((res) => setProduct(res.data.data.product));
    axios
      .get("https://ecommerce-api-react.herokuapp.com/api/v1/products/")
      .then((res) => {
        const productSearch = res.data.data.products.find(
          (productItem) => productItem.id === Number(id)
        );
        // console.log(res.data.data.products);
        setProductItem(productSearch);
        dispatch(filterCategory(productSearch.category.id));
      });
  }, [dispatch, id]);

  console.log(productItem);

  return (
    <Row>
      <Col>
        <Card.Title>{productItem.title}</Card.Title>
        <Card.Text>{productItem.price}</Card.Text>
        <Card>
          <Card.Img variant="top" src={productItem.productImgs} />
          <Card.Body>
            <Card.Text>{productItem.description}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Product;
