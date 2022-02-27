import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useStateValue } from '../../store/Store';

export default function AddLesson({ close, subjectCode }) {
  const [{ api }, dispatch] = useStateValue();
  const [title, setTitle] = useState('');
  const [desrp, setDesrp] = useState('');
  const [link, setLink] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const submitLesson = (e) => {
    e.preventDefault();
    axios
      .post(
        api + '/lesson/video',
        {
          title,
          link,
          subjectCode,
          description: desrp,
        },
        {
          headers: {
            token: localStorage.getItem('_atoken'),
          },
        }
      )
      .then((res) => {
        dispatch({
          type: 'addLesson',
          payload: { subjectCode, newLesson: res.data },
        });
        close();
      })
      .catch((err) => {
        setErrMsg(err.response.data);
      });
  };

  return (
    <div className="bg-light p-3 rounded">
      <Button onClick={close} size="sm">
        &#10007;
      </Button>
      <div>
        <Form onSubmit={submitLesson}>
          <p className="text-danger">{errMsg}</p>
          <Form.Group className="mb-3" controlId="type">
            <Form.Label>Video Title: </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 description-form" controlId="name">
            <Form.Label>Description:</Form.Label> <br />
            <textarea
              cols={120}
              rows={10}
              onChange={(e) => setDesrp(e.target.value)}
            >
              {desrp}
            </textarea>
          </Form.Group>
          <Form.Group className="mb-3" controlId="type">
            <Form.Label>YouTube video Link: </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
}
