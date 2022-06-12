import axios from "axios";
import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { setIsloading } from "../store/slices/isLoading.Slice";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = (data) => {
    dispatch(setIsloading(true));
    axios
      .post("https://ecommerce-api-react.herokuapp.com/api/v1/users", data)
      .then(() => navigate("/login"));
    alert("Successful registration").finally(() =>
      dispatch(setIsloading(false))
    );
  };

  return (
    <Card
      style={{ maxWidth: "400px", padding: "15px" }}
      className="mx-auto mt-5"
    >
      <Card.Title className="my-3" style={{ textAlign: "center" }}>
        Enter the data in the form to create your user
      </Card.Title>

      <Form onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            {...register("firstName")}
            required
            type="text"
            placeholder="Enter first name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            {...register("lastName")}
            required
            type="text"
            placeholder="Enter last name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            {...register("email")}
            required
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...register("password")}
            required
            type="password"
            placeholder="Enter password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Phone (10 characters)</Form.Label>
          <Form.Control
            {...register("phone")}
            type="tel"
            required
            minlength="10"
            maxlength="10"
            placeholder="Enter phone (10 characters)"
          />
        </Form.Group>

        <Button className="mt-2" variant="primary" type="submit">
          Sign Up
        </Button>
        <div style={{ textAlign: "center" }} className="my-4">
          Already have an account?
          <Button
            className="mx-2"
            type="button"
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default SignUp;
