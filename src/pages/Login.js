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
    console.log(data);
  };

  return (
    <div>
      <Card style={{ maxWidth: "500px" }} className="mx-auto">
        <Card.Body>
          <h2 style={{ textAlign: "center" }}>Login</h2>
          <>
            {[
              // "primary",
              // "secondary",
              // "success",
              // "danger",
              // "warning",
              // "info",
              // "light",
              "dark",
            ].map((variant) => (
              <Alert
                style={{ textAlign: "center" }}
                key={variant}
                variant={variant}
              >
                <Alert.Heading>Test data</Alert.Heading>
                <p>Email: mason@gmail.com</p>
                <p>Password: mason1234</p>
              </Alert>
            ))}
          </>

          <Form onSubmit={handleSubmit(submit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
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
            <Button variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
