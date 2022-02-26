import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function AddClass({ close }) {
  const [clsName, setClsName] = useState('');
  const [clsType, setClsType] = useState('academic');

  return (
    <div className="bg-light p-3 rounded">
      <Button onClick={close} size="sm">
        &#10007;
      </Button>
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="type">
            <Form.Label>Class Type: </Form.Label>
            <Form.Select onChange={(e) => setClsType(e.target.value)}>
              <option value="academic">academic</option>
              <option value="non-academic">non-academic</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Class Name: (*unique)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={clsName}
              onChange={(e) => setClsName(e.target.value)}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
}
