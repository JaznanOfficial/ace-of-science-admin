import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useStateValue } from '../../store/Store';

export default function AddSubject({ close, classCode }) {
  const [subjName, setSubjName] = useState('');
  const [{ api }, dispatch] = useStateValue();
  const addSubj = (e) => {
    e.preventDefault();
    axios
      .post(
        api + '/lesson/subject',
        {
          name: subjName,
          classCode,
        },
        {
          headers: {
            token: localStorage.getItem('_atoken'),
          },
        }
      )
      .then((res) => {
        close();
        dispatch({
          type: 'addSubject',
          payload: {
            ...res.data,
          },
        });
      })
      .catch((err) => {
        close();
        alert(err.response.data);
      });
  };
  return (
    <div className="bg-light p-3 rounded">
      <Button onClick={close} size="sm">
        &#10007;
      </Button>
      <div>
        <Form onSubmit={addSubj}>
          <p>Adding class at {classCode}</p>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Subject Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={subjName}
              onChange={(e) => setSubjName(e.target.value)}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
}
