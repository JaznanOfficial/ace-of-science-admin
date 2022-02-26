import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import AddClass from '../components/lesson/AddClass';
import AddSubject from '../components/lesson/AddSubject';
import Classtree from '../components/lesson/Classtree';
import Subjecttree from '../components/lesson/Subjecttree';
import { useStateValue } from '../store/Store';
import '../components/lesson/lstyle.css';
import LessonList from '../components/lesson/LessonList';
import AddLesson from '../components/lesson/AddLesson';

export default function Lesson() {
  const [{ api, classes }, dispatch] = useStateValue();
  const [errMsg, setErrMsg] = useState('');
  const [searchParams] = useSearchParams();
  const [addModel, setAddModel] = useState('');
  useEffect(() => {
    axios
      .get(api + '/lesson/classes', {
        headers: {
          token: localStorage.getItem('_atoken'),
        },
      })
      .then((res) => {
        dispatch({ type: 'setClasses', payload: res.data });
      })
      .catch((err) => {
        setErrMsg(err.response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const addClass = () => {
    setAddModel(<AddClass close={closeModel} />);
  };
  const addSubject = () => {
    setAddModel(
      <AddSubject close={closeModel} classCode={searchParams.get('cls')} />
    );
  };
  const addVideo = () => {
    setAddModel(
      <AddLesson
        close={closeModel}
        subjectCode={searchParams.get('subjcode')}
      />
    );
  };
  const closeModel = () => {
    setAddModel('');
  };
  if (classes)
    return (
      <Container>
        {addModel && <div className="add_modal">{addModel}</div>}
        <p className="text-danger">{errMsg}</p>
        <Row>
          <Col lg={6}>
            <Button variant="outline-info" size="sm" onClick={addClass}>
              &#43; Class
            </Button>
            <Classtree />
          </Col>
          <Col lg={6}>
            {searchParams.get('cls') && (
              <>
                <Button variant="outline-info" size="sm" onClick={addSubject}>
                  &#43;Subject
                </Button>
                <Subjecttree />
              </>
            )}
          </Col>
        </Row>
        <hr />
        <LessonList
          classCode={searchParams.get('cls')}
          subjectCode={searchParams.get('subjcode')}
          addVideo={addVideo}
        />
      </Container>
    );
  else return <h2>Loading Lessons</h2>;
}
