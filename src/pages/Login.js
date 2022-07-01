import axios from 'axios';
import React from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsloading } from '../store/slices/isLoading.Slice';
import swal from 'sweetalert';

const Login = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = (data) => {
    dispatch(setIsloading(true));
    axios
      .post(
        'https://ecommerce-api-react.herokuapp.com/api/v1/users/login',
        data
      )
      .then((res) => {
        // console.log(res.data.data.token);
        localStorage.setItem('token', res.data.data.token);
        localStorage.setItem(
          'userName',
          res.data.data.user.firstName + ' ' + res.data.data.user.lastName
        );
        navigate('/user');
        swal('Logged in');
        swal({
          title: '¡Acces granted!',
          text: 'Logged in',
          icon: 'success',
          buttton: 'aceptar',
        });
      })
      .catch((error) => {
        // console.log(error.response);
        if (error.response.status === 404) {
          swal({
            title: '¡Acces denied!',
            text: 'Invalid credentials',
            icon: 'error',
            buttton: 'aceptar',
          });
        }
      })
      .finally(() => dispatch(setIsloading(false)));
    // console.log(data);
  };

  return (
    <div>
      <i
        onClick={() => navigate('/')}
        style={{ color: '#4582ec', cursor: 'pointer' }}
        className="mx-4 my-3 fa-2x fa-solid fa-house"
      ></i>
      <Card style={{ maxWidth: '400px' }} className="mx-auto ">
        <Card.Body>
          <Card.Title className="my-3" style={{ textAlign: 'center' }}>
            Welcome! Enter your email and password to continue
          </Card.Title>
          <>
            {['primary'].map((variant = 'primary') => (
              <Alert key={variant} variant={variant}>
                <Alert.Heading style={{ textAlign: 'center' }}>
                  Test data
                </Alert.Heading>
                <h6>
                  <i className="m-2 fa-solid fa-envelope"> </i>
                  testuser@gmail.com
                </h6>
                <h6>
                  <i className="m-2 fa-solid fa-lock"></i>1234567890
                </h6>
              </Alert>
            ))}
          </>

          <Form onSubmit={handleSubmit(login)}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                {...register('email')}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                {...register('password')}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              {/* <Form.Check type="checkbox" label="Check me out" /> */}
            </Form.Group>
            <Button type="submit">Login</Button>
            <div style={{ textAlign: 'center' }} className="my-4">
              Don't have an account?{' '}
              <Button
                className="mx-2"
                type="button"
                onClick={() => navigate('/signup')}
              >
                Sign up
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
