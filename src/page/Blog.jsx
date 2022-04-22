import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import "./Blog.css";
// import Swal from "sweetalert2";
import swal from "sweetalert";
import { Link } from "react-router-dom";

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
        
        fetch("https://warm-citadel-00877.herokuapp.com/blogs", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(blogs),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.acknowledged ===true);
                if (data) {
                    swal({
                        title: "Good job!",
                        text: "Your Blogs successfully posted! Please stay with us",
                        icon: "success",
                    });
                    
                    e.target.reset();
                }
               
        })
           



    }
    // getting data--------------------------->
    
    const [getBlogs, setGetBlogs] = useState([])
            useEffect(() => {
                fetch('https://warm-citadel-00877.herokuapp.com/blogs')
                    .then(res => res.json())
                    .then(data => {
                        setGetBlogs(data)
                        
                    })
            },[])
    // console.log(getBlogs);
    const reverseBlogs = [...getBlogs].reverse();


    const deleteBlogHandler = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
              if (willDelete) {
                fetch(`https://warm-citadel-00877.herokuapp.com/blogs/${id}`,{
            method:'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    const remainingBlogs = getBlogs.filter(blog => blog._id !== id);
                    setGetBlogs(remainingBlogs);
                }
            })
              swal("Blog is successfully deleted!", {
                icon: "success",
              });
            } else {
              swal("Blog is not deleted. file is safe!");
            }
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
                    {
                        reverseBlogs.map(singleBlog =><Col>
                            <Card className="shadow">
                                <Card.Img
                                    variant="top"
                                    src={singleBlog.imageLink}
                                    className="m-3"
                                />
                                <Card.Body>
                                    <h3 className="text-center text-danger">{singleBlog.heading}</h3>
                                    <Card.Text>
                                        {singleBlog.text.slice(0,200)}...
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="d-flex flex-row justify-content-around align-items-center">
                                    
                                        <Link to={`/single-blog/${singleBlog._id}`} className='see-more'>
                                        <Button variant="outline-success" className="m-1">
                                        <strong>See More <i class="fas fa-arrow-circle-right"></i>{" "}</strong>
                                    </Button>
                                            
                                        </Link>
                                   
                                    <Button variant="outline-danger" className="m-1" onClick={()=> deleteBlogHandler(singleBlog._id)}>
                                        <strong>Remove this Blog</strong>
                                    </Button>
                                </Card.Footer>
                            </Card>
                    </Col> )
                    }
                        
                    
                </Row>
            </div>
        </div>
    );
};

export default Blog;
