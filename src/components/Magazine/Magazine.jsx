import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

const Magazine = () => {
    return (
        <div className="container">
            <h1>Magazine</h1>
            <form>
                <div className="form-group">
                    <label for="pdfLink">Link of pdf</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Pdf Link"
                    />
                </div>
                <div className="form-group mt-3">
                    <label for="exampleInputPassword1">Image that will show to user</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Image Link"
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                    Submit
                </button>
            </form>

            <div className="container my-5">
                <h1 className="text-danger">Posted All Magazines</h1>

                <Row xs={1} md={3} className="g-4">
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <Col>
                            <Card className="shadow">
                                <Card.Img
                                    variant="top"
                                    src="https://thumbs.dreamstime.com/b/freedom-concept-silhouettes-broken-chain-birds-flying-sky-180470108.jpg"
                                    className="m-3"
                                />

                                <Card.Footer>
                                    <Button variant="outline-danger" className="m-1">
                                        <strong>Remove this Magazine</strong>
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

export default Magazine;
