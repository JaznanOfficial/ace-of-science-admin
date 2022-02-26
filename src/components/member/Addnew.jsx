import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useStateValue } from '../../store/Store';

export default function Addnew() {
  const [{ api }, dispatch] = useStateValue();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('moderator');
  const [tmpPass, setTmpPass] = useState(0);
  const [errMsg, setErrMsg] = useState('');

  const addNew = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Is info ok?\nName: ${name}\nEmail: ${email}\nRole: ${role}`)) {
      axios
        .post(
          api + '/adminuser/new',
          {
            name,
            email,
            role,
          },
          {
            headers: {
              token: localStorage.getItem('_atoken'),
            },
          }
        )
        .then((res) => {
          setTmpPass(res.data.tempPassCode);
          dispatch({ type: 'addNewUser', payload: { name, email, role } });
        })
        .catch((err) => {
          setErrMsg(err.response.data);
        });
    }
  };
  return (
    <div>
      <p className="text-danger">{errMsg}</p>

      <Form onSubmit={addNew}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name: </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Email: </Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Role: </Form.Label>
          <Form.Select size="sm" onChange={(e) => setRole(e.target.value)}>
            <option value="moderator">moderator</option>
            <option value="admin">admin</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
      {tmpPass !== 0 && (
        <>
          <h2>Email: {email}</h2>
          <h3>Temp Password: {tmpPass}</h3>
          <p className="text-info">
            Remember the temp pass and Of course Change it after login.
          </p>
        </>
      )}
    </div>
  );
}
