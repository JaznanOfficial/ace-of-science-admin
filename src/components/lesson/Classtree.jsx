import React from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../store/Store';

export default function Classtree() {
  const [{ classes }] = useStateValue();
  return (
    <div>
      <ul>
        <li>
          Academic
          <ul>
            {classes.academic?.map((c, key) => (
              <Link to={'/lesson?cls=' + c.classCode} key={key}>
                <li>{c.name}</li>
              </Link>
            ))}
          </ul>
        </li>
        {Object.values(classes).map(
          (c, key) => c.name && <li key={key}>{c.name}</li>
        )}
      </ul>
    </div>
  );
}
