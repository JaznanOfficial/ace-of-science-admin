import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStateValue } from "../../store/Store";

export default function LessonList({ subjectCode, addVideo }) {
    const [{ lessons, api }, dispatch] = useStateValue();
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        if (!lessons?.[subjectCode]) {
            axios
                .get(api + "/lesson/video/" + subjectCode, {
                    headers: {
                        token: localStorage.getItem("_atoken"),
                    },
                })
                .then((res) => {
                    dispatch({
                        type: "setLessons",
                        payload: { subjectCode, lessonsArr: res.data },
                    });
                })
                .catch((err) => {
                    setErrMsg(err.response.data);
                });
        }
    }, [api, dispatch, lessons, subjectCode]);

    const deleteVideo = (id, title) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure to delete the video?\nTitle: " + title)) {
            axios
                .delete(api + "/lesson/video/" + id, {
                    headers: {
                        token: localStorage.getItem("_atoken"),
                    },
                })
                .then((res) => {
                    dispatch({
                        type: "deleteLessons",
                        payload: { subjectCode, id },
                    });
                })
                .catch((err) => {
                    setErrMsg(err.response.data);
                });
        }
    };

    if (!lessons?.[subjectCode]) return <h3>Video Loading ...</h3>;
    else
        return (
            <div>
                <p className="text-danger">{errMsg}</p>
                {subjectCode && (
                    <Button variant="outline-info" size="sm" className="m-3" onClick={addVideo}>
                        &#43; Video
                    </Button>
                )}

                <div>
                    {lessons[subjectCode]?.map((l, key) => (
                        <Row>
                            <Col className="d-lg-flex flex-row justify-content-center align-items-center shadow my-3">
                                <div className="m-3 w-100">
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={l.embedHref}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <div className="my-3 w-100">
                                    <h2>{l.title}</h2>
                                    <h5>{l.description}</h5>
                                    <p>Uploaded: {new Date(l.createdAt).toLocaleDateString()}</p>
                                    <div className="btn-group">
                                        <Link
                                            className="btn btn-outline-primary btn-sm"
                                            to={"/watch/" + l.videoId + "?subjcode=" + subjectCode}
                                        >
                                            Edit
                                        </Link>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => deleteVideo(l.videoId, l.title)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    ))}
                </div>
            </div>
        );
}
