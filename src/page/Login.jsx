import axios from 'axios';
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useStateValue } from '../store/Store';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loginErr, setLoginErr] = useState('');
  const [{ api }] = useStateValue();
  const [searchParams] = useSearchParams();

  const submited = (e) => {
    e.preventDefault();
    axios
      .get(api + '/adminuser/login', {
        headers: {
          email,
          pass,
        },
      })
      .then((res) => {
        localStorage.setItem('_atoken', res.data.token);
        navigate(searchParams.get('to'));
      })
      .catch((err) => setLoginErr(err.response.data));
  };
  if (localStorage.getItem('_atoken'))
    return <Navigate to="/" />;
  else
    return (
      <Container>
        <p className="text-danger">{loginErr}</p>
        <Form onSubmit={submited}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    );
}
