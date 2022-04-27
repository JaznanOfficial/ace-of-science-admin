import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from "react-bootstrap";
import swal from 'sweetalert';

const GetNotes = () => {


    const [getNotes, setGetNotes] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/notes")
            .then((res) => res.json())
            .then((data) => {
                setGetNotes(data);
            });
    }, []);
   
    // console.log(getBlogs);
    const reverseNotes = [...getNotes].reverse();


    // deleting notes data-------------------------------->

    

        return (
            <div className="single-note my-5">
                <Row xs={1} md={4} className="g-2">
                    {
                        reverseNotes.map(notes => <Col key={notes._id}>
                            <a href={notes.pdfLink} className="text-decoration-none text-dark">
                                <Card className="overflow-hidden p-1">
                                    <Card.Body className="d-flex flex-row justify-content-center align-items-center text-decoration-none p-0">
                                        <h2>
                                            <i className="fa-solid fa-file-pen mx-3"></i>
                                        </h2>
                                    
                                        <p className="me-1">
                                            {notes.text}
                                        </p>
                                   
                                    </Card.Body>
                                </Card>
                            </a>
                            <Button variant="outline-danger" className="mt-1">
                                Remove Notes
                            </Button>
                        </Col>)
                    }
                        
            
                </Row>
            </div>
        );
    };

export default GetNotes;