import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import { useStateValue } from '../../store/Store';

export default function Subjecttree() {
  const [{ api, subjects }, dispatch] = useStateValue();
  const [searchParams] = useSearchParams();
  const [errMsg, setErrMsg] = useState('');
  const editSubjectName = (subjcode) => {
    var newName = prompt('Enter new Name.');
    if (subjcode && newName) {
      axios
        .put(
          api + '/lesson/subjectname',
          {
            newName,
            subjectCode: subjcode,
          },
          {
            headers: {
              token: localStorage.getItem('_atoken'),
            },
          }
        )
        .then((res) => {
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        })
        .catch((err) => {
          setErrMsg(err.response.data);
        });
    } else alert('New Name is Requeird.');
  };
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
        <h2>Subject</h2>
        <p className="text-danger">{errMsg}</p>

        {subjects[searchParams.get('cls')].map((s, key) => (
          <div
            key={key}
            className="d-flex flex-rew justify-content-start align-items-center m-2"
          >
            <Link
              to={'/lesson?cls=' + s.classCode + '&subjcode=' + s.subjectCode}
            >
              <Button>{s.name}</Button>
            </Link>

            <Button
              variant="outline-primary"
              onClick={() => editSubjectName(s.subjectCode)}
              className="ms-2"
            >
              Edit
            </Button>
          </div>
        ))}

        {!subjects[searchParams.get('cls')].length && (
          <p className="text-danger">No subject of the class </p>
        )}
      </div>
    );
}
