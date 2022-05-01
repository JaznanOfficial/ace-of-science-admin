import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import swal from "sweetalert";
import "./GetEvents.css";

const GetEvents = () => {
    const [getEvents, setGetEvents] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/event")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setGetEvents(data);
            });
        }, []);
        // console.log(getEvents);
    
    
     // deleting notes data-------------------------------->
     const deleteNoteHandler = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                fetch(`http://localhost:5000/event/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            const remainingNotes = getEvents.filter((blog) => blog._id !== id);
                            setGetEvents(remainingNotes);
                        }
                    });
                swal("Blog is successfully deleted!", {
                    icon: "success",
                });
            } else {
                swal("Blog is not deleted. file is safe!");
            }
        });
    };

    return (
        <div className="container my-5 achievement">
            {
                getEvents.map(event => <div>
                    <div className="text-start mb-4">
                    {" "}
                    <h1 className="text-center">Our Events </h1>
                    <h1 className="text-center">
                        <strong className="text-danger">{event.heading}</strong>
                    </h1>
                </div>
                <Row xs={1} md={4} className="g-4">
                    
                            <Col>
                            <Card className="px-2">
                                <img
                                    variant="top"
                                    src={event.firstImage}
                                    className="mx-auto my-2 achievement-img"
                                    alt="img not found"

                                />
                                {/*  <Card.Body>
                                    <Card.Title>Achievement-1</Card.Title>
                                </Card.Body> */}
                            </Card>
                        </Col>
                        <Col>
                            <Card className="px-2">
                                <img
                                    variant="top"
                                    src={event.secondImage}
                                    className="mx-auto my-2 achievement-img"
                                    alt="img not found"
                                    width="88%"
                                    height="88%"
                                />
                                {/*  <Card.Body>
                                    <Card.Title>Achievement-1</Card.Title>
                                </Card.Body> */}
                            </Card>
                        </Col>
                        <Col>
                            <Card className="px-2">
                                <img
                                    variant="top"
                                    src={event.thirdImage}
                                    className="mx-auto my-2 achievement-img"
                                    alt="img not found"
                                    width="88%"
                                    height="88%"
                                />
                                {/*  <Card.Body>
                                    <Card.Title>Achievement-1</Card.Title>
                                </Card.Body> */}
                            </Card>
                        </Col>
                        <Col>
                            <Card className="px-2">
                                <img
                                    variant="top"
                                    src={event.fourthImage}
                                    className="mx-auto my-2 achievement-img"
                                    alt="img not found"
                                    width="88%"
                                    height="88%"
                                />
                                {/*  <Card.Body>
                                    <Card.Title>Achievement-1</Card.Title>
                                </Card.Body> */}
                            </Card>
                        </Col>
                     
                       
                            
                    
       
                    </Row>
                    <Button variant="outline-danger" className="mt-1" onClick={() => deleteNoteHandler(event._id)}>
                            Remove Notes
                        </Button>
                </div>)
            }
        </div>
    );
};

export default GetEvents;
