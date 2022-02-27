import React from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../store/Store';
import './classtree.css'

export default function Classtree() {
  const [{ classes }] = useStateValue();
  return (
    <div className='list-group'>
      <ul>
      <li>
      Academic
          <ol>
            {classes.academic?.map((c, key) => (
              <Link to={'/lesson?cls=' + c.classCode} key={key} type="button" class="list-group-item list-group-item-action">
                <li className='px-3 mx-2'>{c.name}</li>
              </Link>
            ))}
          </ol>
        </li>
        {Object.values(classes).map(
          (c, key) => c.name && <li key={key}>{c.name}</li>
        )}
      </ul>
    </div>
  );
}
