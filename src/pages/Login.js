import axios from "axios";
import React from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const submit = (data) => {
    axios
      .post(
        "https://ecommerce-api-react.herokuapp.com/api/v1/users/login",
        data
      )
      .then((res) => {
        // console.log(res.data.data.token);
        localStorage.setItem("token", res.data.data.token);
        navigate("/");
        alert("Logged in");
      })
      .catch((error) => {
        // console.log(error.response);
        if (error.response.status === 404) {
          alert("Wrong credentials");
        }
      });
    // console.log(data);
  };

  return (
    <div>
      <Card style={{ maxWidth: "400px" }} className="mx-auto mt-5">
        <Card.Body>
          <Card.Title className="m-3" style={{ textAlign: "center" }}>
            Welcome! Enter your email and password to continue
          </Card.Title>
          <>
            {[
              "primary",
              // "secondary",
              // "success",
              // "danger",
              // "warning",
              // "info",
              // "light",
              // "dark",
            ].map((variant) => (
              <Alert key={variant} variant={variant}>
                <Alert.Heading style={{ textAlign: "center" }}>
                  Test data
                </Alert.Heading>
                <h6>
                  <i className="m-2 fa-solid fa-envelope"> </i>mason@gmail.com
                </h6>
                <h6>
                  <i className="m-2 fa-solid fa-lock"></i>mason1234
                </h6>
              </Alert>
            ))}
          </>

          <Form onSubmit={handleSubmit(submit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                {...register("email")}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                {...register("password")}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              {/* <Form.Check type="checkbox" label="Check me out" /> */}
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
