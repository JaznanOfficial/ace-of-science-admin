import React, { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import swal from "sweetalert";
import GetEvents from "../GetEvents/GetEvents";

const Events = () => {
    const firstImageRef = useRef();
    const secondImageRef = useRef();
    const thirdImageRef = useRef();
    const fourthImageRef = useRef();
    const headingRef = useRef();

    const eventsHandler = (e) => {
        e.preventDefault();
        const firstImage = firstImageRef.current.value;
        const secondImage = secondImageRef.current.value;
        const thirdImage = thirdImageRef.current.value;
        const fourthImage = fourthImageRef.current.value;
        const heading = headingRef.current.value;
        const data = { firstImage, secondImage, thirdImage, fourthImage, heading };
        console.log(data);
        fetch("http://localhost:5000/event", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.acknowledged === true);
                if (data) {
                    swal({
                        title: "Good job!",
                        text: "Your Blogs successfully posted! Please stay with us",
                        icon: "success",
                    });
                    firstImageRef.current.value = "";
                    secondImageRef.current.value = "";
                    thirdImageRef.current.value = "";
                    fourthImageRef.current.value = "";
                    headingRef.current.value = "";
                }
            });
    };
    return (
        <div>
            <Container className="my-3">
                <h1 className="text-danger text-center">Write here your about events</h1>

                <Form onSubmit={eventsHandler}>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Event Heading</Form.Label>
                        <Form.Control
                            type="text"
                            ref={headingRef}
                            placeholder="Enter Event Heading"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Event First Image</Form.Label>
                        <Form.Control
                            type="text"
                            ref={firstImageRef}
                            placeholder="Enter Event First Image Link"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Event Second Image</Form.Label>
                        <Form.Control
                            type="text"
                            ref={secondImageRef}
                            placeholder="Enter Event Second Image Link"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Event Third Image</Form.Label>
                        <Form.Control
                            type="text"
                            ref={thirdImageRef}
                            placeholder="Enter Event Third Image Link"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Event Fourth Image</Form.Label>
                        <Form.Control
                            type="text"
                            ref={fourthImageRef}
                            placeholder="Enter Fourth Event Image Link"
                        />
                    </Form.Group>

                    <Button variant="outline-danger" type="submit" className="m-1">
                        <strong>Post this Event</strong>
                    </Button>
                </Form>
            </Container>

            <div>
            <GetEvents></GetEvents>
            </div>
        </div>
    );
};

export default Events;
