import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

import "./Blog.css";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
export default function Blog() {
    const [editorState, seteditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (editorState) => {
        seteditorState(editorState);
    };
    return (
        <>
            <Container className="my-3">
                <h1 className="text-danger text-center">Write here your blog</h1>
                <Editor
                    editorState={editorState}
                    className="border"
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                />
                <Button variant="outline-danger" className="m-1">
                    <strong>Post this Blog</strong>
                </Button>
            </Container>
            <div className="container my-5">
                <h1 className="text-danger">Posted All Blogs</h1>

                <Row xs={1} md={3} className="g-4">
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <Col>
                            <Card className="shadow">
                                <Card.Img
                                    variant="top"
                                    src="https://thumbs.dreamstime.com/b/freedom-concept-silhouettes-broken-chain-birds-flying-sky-180470108.jpg"
                                    className="m-3"
                                />
                                <Card.Body>
                                    <h3>Card title</h3>
                                    <Card.Text>
                                        This is a longer card with supporting text below as a
                                        natural lead-in to additional content. This content is a
                                        little bit longer.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <strong className="mb-3">
                                        <a href="#" className="see-more">
                                            See More <i class="fas fa-arrow-circle-right"></i>{" "}
                                        </a>
                            </strong>
                            <Button variant="outline-danger" className="m-1">
                    <strong>Remove this Blog</strong>
                </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
}
