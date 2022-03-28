import React, { useRef } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import "./Blog.css";

const Blog = () => {
    const imageRef = useRef();
    const headingRef = useRef();
    const textRef = useRef();




    const blogHandler = (e) => {
        e.preventDefault();
        const imageLink = imageRef.current.value;
        const heading = headingRef.current.value;
        const text = textRef.current.value;
        const blogs = { imageLink, heading, text };
        console.log(blogs);
        
        fetch("https://enigmatic-crag-58614.herokuapp.com/blogs", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(blogs),
        });
    }

    return (
        <div>
            <Container className="my-3">
                <h1 className="text-danger text-center">Write here your blog</h1>

                <Form onSubmit={blogHandler}>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Blog Image</Form.Label>
                        <Form.Control type="text" ref={imageRef} placeholder="Enter Blog Image Link" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Blog Heading</Form.Label>
                        <Form.Control type="text" ref={headingRef} placeholder="Enter Blog Heading" />
                    </Form.Group>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Blog Body</label>
                        <textarea
                            class="form-control my-3"
                            id="exampleFormControlTextarea1"
                            rows="7"
                            placeholder="Write Blog Text Here"
                            ref={textRef}
                        ></textarea>
                    </div>

                    <Button variant="outline-danger" type="submit" className="m-1">
                        <strong>Post this Blog</strong>
                    </Button>
                </Form>
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
        </div>
    );
};

export default Blog;
