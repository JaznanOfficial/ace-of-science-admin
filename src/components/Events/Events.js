
import React, { useRef } from 'react';
import { Container, Form,Button } from 'react-bootstrap';

const Events = () => {
    const imageRef = useRef();
    const headingRef = useRef();



    const eventsHandler = (e) => {
        e.preventDefault();
        const image = imageRef.current.value;
        const heading = headingRef.current.value;
        console.log({image,heading});
    }
    return (
        <div>
        <Container className="my-3">
        <h1 className="text-danger text-center">Write here your about events</h1>

        <Form onSubmit={eventsHandler}>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Event Image</Form.Label>
                <Form.Control type="text" ref={imageRef} placeholder="Enter Event Image Link" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Event Heading</Form.Label>
                <Form.Control type="text" ref={headingRef} placeholder="Enter Event Heading" />
            </Form.Group>
            

            <Button variant="outline-danger" type="submit" className="m-1">
                <strong>Post this Event</strong>
            </Button>
        </Form>
    </Container>
        </div>
    );
};

export default Events;