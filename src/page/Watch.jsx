import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useStateValue } from '../store/Store';

export default function Watch() {
  const [{ lessons, api }, dispatch] = useStateValue();
  const { vid } = useParams();
  const [searchparams] = useSearchParams();
  const [v, setV] = useState({});
  const nv = useNavigate();
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    var l = lessons?.[searchparams.get('subjcode')]?.filter(
      (l) => l.videoId === vid
    );
    if (l) setV(...l);
    else {
      axios
        .get(api + '/lesson/video/' + searchparams.get('subjcode'), {
          headers: {
            token: localStorage.getItem('_atoken'),
          },
        })
        .then((res) => {
          dispatch({
            type: 'setLessons',
            payload: {
              subjectCode: searchparams.get('subjcode'),
              lessonsArr: res.data,
            },
          });
        })
        .catch((err) => {
          setErrMsg(err.response.data);
        });
    }
  }, [api, dispatch, lessons, searchparams, vid]);
  const deleteVideo = (id, title) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure to delete the video?\nTitle: ' + title)) {
      axios
        .delete(api + '/lesson/video/' + id, {
          headers: {
            token: localStorage.getItem('_atoken'),
          },
        })
        .then((res) => {
          dispatch({
            type: 'deleteLessons',
            payload: { subjectCode: searchparams.get('subjcode'), id },
          });
          nv('..');
        })
        .catch((err) => {
          setErrMsg(err.response.data);
        });
    }
  };

  if (!lessons?.[searchparams.get('subjcode')])
    return <h3>Loding video. . .</h3>;
  else
    return (
      <div>
        <Container>
          <p className="text-danger">{errMsg}</p>
          <iframe
            width="100%"
            height="700"
            src={v.embedHref}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
          ></iframe>
          <p>Uploaded: {new Date(v.createdAt).toLocaleDateString()}</p>
          <h2>{v.title}</h2>
          <h5>{v.description}</h5>
          <div className="btn-group m-4">
            <Button variant="outline-primary" size="sm">
              Edit
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => deleteVideo(v.videoId, v.title)}
            >
              Delete
            </Button>
          </div>
        </Container>
      </div>
    );
}
