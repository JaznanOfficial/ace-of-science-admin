import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useStateValue } from '../../store/Store';

export default function Subjecttree() {
  const [{ api, subjects }, dispatch] = useStateValue();
  const [searchParams] = useSearchParams();
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (!subjects?.[searchParams.get('cls')]) {
      axios
        .get(api + '/lesson/subjects/' + searchParams.get('cls'), {
          headers: {
            token: localStorage.getItem('_atoken'),
          },
        })
        .then((res) => {
          dispatch({
            type: 'setSubject',
            payload: {
              classCode: searchParams.get('cls'),
              subjectsArr: res.data,
            },
          });
        })
        .catch((err) => {
          setErrMsg(err.response.data);
        });
    }
  }, [api, dispatch, searchParams, subjects]);

  if (!subjects?.[searchParams.get('cls')]) {
    return <h2>Loading Subjects</h2>;
  } else
    return (
      <div  className='list-group'>
        <p className="text-danger">{errMsg}</p>
        <ol>
          {subjects[searchParams.get('cls')].map((s, key) => (
            <li key={key}>
              <Link
                to={'/lesson?cls=' + s.classCode + '&subjcode=' + s.subjectCode}
                type="button" class="list-group-item list-group-item-action"
              >
                {s.name}
                </Link>
                <i class="fa-solid fa-pen-to-square" type='button'></i>
                
                
            </li>
          ))}
        </ol>
        {!subjects[searchParams.get('cls')].length && (
          <p className="text-danger">No subject of the class </p>
        )}
      </div>
    );
}
