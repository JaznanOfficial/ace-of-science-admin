import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../store/Store';

export default function ListUser() {
  const [{ user, users, api }, dispatch] = useStateValue();
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (!users?.length) {
      axios
        .get(api + '/adminuser', {
          headers: {
            token: localStorage.getItem('_atoken'),
          },
        })
        .then((res) => {
          dispatch({ type: 'setUserList', payload: res.data });
        })
        .catch((err) => {
          setErrMsg(err.responsed.data);
        });
    }
  }, [api, dispatch, users?.length]);

  const deleteUser = (id, name) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure to deleting ' + name)) {
      axios
        .delete(api + '/adminuser/' + id, {
          headers: {
            token: localStorage.getItem('_atoken'),
          },
        })
        .then((res) => {
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        })
        .catch((err) => {
          setErrMsg(err.response.data);
        });
    }
  };

  return (
    <div>
      <p className="text-danger">{errMsg}</p>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name & email</th>
            <th>Role</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((u, key) => (
            <tr key={key}>
              <td>{user._id === u._id ? 'ME' : key + 1}</td>
              <td>{u.name + ' , ' + u.email}</td>
              <td>{u.role}</td>
              <td>
                <div className="btn-group">
                  <Link
                    className="btn btn-sm btn-primary"
                    to={'/adminusers?profile=' + u._id}
                  >
                    Profile
                  </Link>
                  {user.role === 'admin' && user._id !== u._id && (
                    <Button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteUser(u._id, u.name)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
