import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { filterCategory } from "../store/slices/products.slices";
import { Button, Card, Col, Row } from "react-bootstrap";
import { addToCart } from "../store/slices/cart.slice";

const Product = () => {
  const [productItem, setProductItem] = useState({});
  const [quantity, setQuantity] = useState(1);
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

  // console.log(productItem);

  const addCart = () => {
    const cart = {
      id,
      quantity,
    };
    dispatch(addToCart(cart));
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Body style={{ maxWidth: "500px" }} className="mx-auto">
            <Card.Title>{productItem.title}</Card.Title>
            <Card.Img
              style={{ width: "200PX", maxHeight: "400px" }}
              variant="top"
              src={productItem.productImgs}
            />
            <Card.Text>Price {productItem.price}</Card.Text>
            <input
              type="number"
              placeholder="Quantity"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
            ></input>
            <Button variant="dark" onClick={addCart}>
              Add to Cart
            </Button>
            <Card.Text>{productItem.description}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Product;
