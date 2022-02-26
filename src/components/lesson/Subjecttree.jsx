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
      <div>
        <p className="text-danger">{errMsg}</p>
        <ul>
          {subjects[searchParams.get('cls')].map((s, key) => (
            <li key={key}>
              <Link
                to={'/lesson?cls=' + s.classCode + '&subjcode=' + s.subjectCode}
              >
                {s.name}
              </Link>
              <span>
                <span className="btn text-info btn-sm">&#9998;</span>
              </span>
            </li>
          ))}
        </ul>
        {!subjects[searchParams.get('cls')].length && (
          <p className="text-danger">No subject of the class </p>
        )}
      </div>
    );
}
