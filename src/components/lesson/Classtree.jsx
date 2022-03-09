import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../store/Store';
import './classtree.css';

export default function Classtree() {
  const [{ classes }] = useStateValue();
  return (
    <div>
      <h2 className="align-center">Academic</h2>
      <p className="text-danger"></p>
      {classes.academic?.map((c, key) => (
        <div
          key={key}
          className="d-flex flex-rew justify-content-start align-items-center m-2"
        >
          <Link to={'/lesson?cls=' + c.classCode} type="button">
            <Button>{c.name}</Button>
          </Link>
          {/* <Button variant="outline-danger" className="ms-2">
            Remove
          </Button> */}
        </div>
      ))}

      {Object.values(classes).map(
        (c, key) => c.name && <li key={key}>{c.name}</li>
      )}
    </div>
  );
}
