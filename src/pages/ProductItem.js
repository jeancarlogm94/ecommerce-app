import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { filterCategory } from "../store/slices/products.slices";
import { Button, Card, Col, Row } from "react-bootstrap";
import { addToCart } from "../store/slices/cart.slice";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productDetail, setProductDetail] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const productsList = useSelector((state) => state.products);

  useEffect(() => {
    axios
      .get("https://ecommerce-api-react.herokuapp.com/api/v1/products/")
      .then((res) => {
        const productSearch = res.data.data.products.find(
          (productDetail) => productDetail.id === Number(id)
        );
        // console.log(res.data.data.products);
        setProductDetail(productSearch);
        dispatch(filterCategory(productSearch.category.id));
      });
  }, [dispatch, id]);

  // console.log(productDetail);
  console.log(productsList);

  const addCart = () => {
    const cart = {
      id,
      quantity,
    };
    dispatch(addToCart(cart));
  };

  return (
    <div>
      <Row>
        <Col>
          <Card
            className="my-4"
            style={{
              margin: "15px",
              padding: "4px",
            }}
          >
            <Card.Body style={{ maxWidth: "500px" }} className="mx-auto">
              <Card.Img
                style={{ width: "250PX", maxHeight: "400px" }}
                variant="top"
                src={productDetail.productImgs}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card
            className="my-4"
            style={{
              padding: "23px",
              margin: "15px",
            }}
          >
            <Card.Title className="my-2" variant="primary">
              {productDetail.title}
            </Card.Title>
            <Card.Text>{productDetail.description}</Card.Text>
            <Card.Text>Price ${productDetail.price}</Card.Text>
            <Card.Text>Quantity</Card.Text>
            <div
            // style={{
            //   display: "inlineBlock",
            //   justifyContent: "center",
            //   alignItems: "center",
            // }}
            >
              {" "}
              <Button
                style={{ width: "50px" }}
                onClick={() => setQuantity((decrement) => decrement - 1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <input
                style={{
                  margin: "10px",
                  borderRadius: "5px",
                  borderColor: "#4582ec",
                  width: "40px",
                  textAlign: "right",
                }}
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                disabled
              ></input>
              <Button
                style={{ width: "50px" }}
                onClick={() => setQuantity((increment) => increment + 1)}
              >
                +
              </Button>
              <Button
                style={{ margin: "10px" }}
                variant="primary"
                onClick={addCart}
              >
                Add Cart
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {productsList.map((productList) => (
          <Col key={productList.id}>
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
              onClick={() => navigate(`/products/${productList.id}`)}
            >
              <Card.Img
                style={{
                  width: "auto",
                  height: "auto",
                  maxHeight: "250px",
                  maxWidth: "200px",
                }}
                variant="top"
                src={productList.productImgs}
              />
            </Card>
            <Card
              className="mb-5"
              style={{
                width: "auto",
                height: "100px",
                maxWidth: "300px",
                cursor: "pointer",
                padding: "10px",
              }}
              onClick={() => navigate(`/products/${productList.id}`)}
            >
              <Card.Title>{productList.title}</Card.Title>
              <Card.Text>Price {productList.price}</Card.Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Product;
