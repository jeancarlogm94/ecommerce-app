import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { filterCategory } from '../store/slices/products.slices';
import { Alert, Button, Card, Carousel, Col, Row } from 'react-bootstrap';
import { addToCart } from '../store/slices/cart.slice';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productDetail, setProductDetail] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const productsList = useSelector((state) => state.products);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get('https://ecommerce-api-react.herokuapp.com/api/v1/products/')
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
  // console.log(productsList);

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
          <Card className="my-4">
            <i
              onClick={() => navigate('/')}
              style={{ color: '#4582ec', cursor: 'pointer' }}
              className="m-3 mb- fa-2x fa-solid fa-house"
            ></i>
            <Card.Body className="mx-auto">
              <Carousel variant="dark">
                <Carousel.Item>
                  <Card.Img
                    className="mx-auto"
                    style={{
                      padding: '50px',
                      width: 'auto',
                      height: 'auto',
                      maxHeight: '300px',
                      maxWidth: '300px',
                    }}
                    src={productDetail.productImgs?.[0]}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <Card.Img
                    className="mx-auto"
                    style={{
                      padding: '50px',
                      width: 'auto',
                      height: 'auto',
                      maxHeight: '300px',
                      maxWidth: '300px',
                    }}
                    src={productDetail.productImgs?.[1]}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <Card.Img
                    className="mx-auto"
                    style={{
                      padding: '50px',
                      width: 'auto',
                      height: 'auto',
                      maxHeight: '300px',
                      maxWidth: '300px',
                    }}
                    src={productDetail.productImgs?.[2]}
                  />
                </Carousel.Item>
              </Carousel>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card
            className="my-4"
            style={{
              padding: '23px',
              margin: '15px',
            }}
          >
            <Alert>
              <Card.Title className="my-2" variant="primary">
                {productDetail.title}
              </Card.Title>
            </Alert>
            <Card.Text style={{ fontSize: '12pt' }}>
              {productDetail.description}
            </Card.Text>
            <Card.Text>
              <b>Price ${productDetail.price}</b>
            </Card.Text>
            <Card.Text>
              <b>Quantity</b>
            </Card.Text>
            <div>
              <Button
                style={{ width: '50px' }}
                onClick={() => setQuantity((decrement) => decrement - 1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <input
                style={{
                  margin: '10px',
                  border: '1px solid #4582ec',
                  borderRadius: '5px',
                  width: '50px',
                  height: '40px',
                  textAlign: 'right',
                }}
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                disabled
              ></input>
              <Button
                style={{ width: '50px' }}
                onClick={() => setQuantity((increment) => increment + 1)}
              >
                +
              </Button>
              <i
                style={{
                  margin: '10px',
                  padding: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#4582ec',
                  color: 'white',
                  cursor: 'pointer',
                }}
                className="fa-solid fa-cart-shopping"
                onClick={addCart}
              ></i>
            </div>
          </Card>
        </Col>
      </Row>

      <Card.Title className="my-2">Similar Products ...</Card.Title>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {productsList.map((productList) => (
          <Col key={productList.id}>
            <Card
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 'auto',
                height: '300px',
                maxWidth: '300px',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/products/${productList.id}`)}
            >
              <Card.Img
                id="product-1"
                className="mx-auto"
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxHeight: '200px',
                  maxWidth: '200px',
                }}
                variant="top"
                src={productList.productImgs}
              />
            </Card>
            <Card
              className="my-2"
              style={{
                width: 'auto',
                height: '100px',
                maxWidth: '300px',
                cursor: 'pointer',
                padding: '10px',
              }}
              onClick={() => navigate(`/products/${productList.id}`)}
            >
              <Card.Title>{productList.title}</Card.Title>
              <Card.Text>Price ${productList.price}</Card.Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductDetail;
