import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function AddSubject({ close, classCode }) {
  const [subjName, setSubjName] = useState('');
  const addSubj = (e) => {
    e.preventDefault();
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
