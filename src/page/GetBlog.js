import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const GetBlog = () => {

    const [getBlogs, setGetBlogs] = useState([])
    useEffect(() => {
        fetch("https://warm-citadel-00877.herokuapp.com/blogs")
            .then((res) => res.json())
            .then((data) => {
                setGetBlogs(data);
            });
    }, []);
   
    // console.log(getBlogs);
    const reverseBlogs = [...getBlogs].reverse();

    const deleteBlogHandler = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                fetch(`https://warm-citadel-00877.herokuapp.com/blogs/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            const remainingBlogs = getBlogs.filter((blog) => blog._id !== id);
                            setGetBlogs(remainingBlogs);
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
        <div>
            <div className="container my-5">
                <h1 className="text-danger">Posted All Blogs</h1>

                <Row xs={1} md={3} className="g-4">
                    {reverseBlogs.map((singleBlog) => {
                        const content = singleBlog.content
                        // console.log(content);
                        return <Col key={singleBlog._id}>
                            <Card className="shadow blog-card" >
                                <Card.Body dangerouslySetInnerHTML={{
                                    __html:  content
                                }} className='overflow-hidden pb-3'>
                                
                                </Card.Body>
                                
                                <Card.Footer className="d-flex flex-row justify-content-around align-items-center">
                                    <Link
                                        to={`/single-blog/${singleBlog._id}`}
                                        className="see-more"
                                    >
                                        <Button variant="outline-success" className="m-1">
                                            <strong>
                                                See More <i className="fas fa-arrow-circle-right"></i>{" "}
                                            </strong>
                                        </Button>
                                    </Link>

                                    <Button
                                        variant="outline-danger"
                                        className="m-1"
                                        onClick={() => deleteBlogHandler(singleBlog._id)}
                                    >
                                        <strong>Remove this Blog</strong>
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    })}
                </Row>
            </div>
        </div>
    );
};

export default GetBlog;
