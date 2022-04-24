import React, { useState, useEffect } from "react";
import "./Review.css";

import { Col, Row } from "react-bootstrap";
import Rating from "react-rating";
import swal from "sweetalert";

const Review = () => {
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        fetch("https://warm-citadel-00877.herokuapp.com/review")
            .then((res) => res.json())
            .then((data) => setRatings(data));
    }, []);
    const reverseRatings = [...ratings].reverse();
    console.log(reverseRatings);

    const deleteReviewHandler = (id) => {
        console.log(id);

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                fetch(`https://warm-citadel-00877.herokuapp.com/review/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            const remainingBlogs = ratings.filter((rating) => rating._id !== id);
                            setRatings(remainingBlogs);
                        }
                    });
                swal("Review is successfully deleted!", {
                    icon: "success",
                });
            } else {
                swal("Review is not deleted. file is safe!");
            }
        });
    };
    return (
        <div className="container my-3">
            <Row xs={1} md={1} className="g-4">
                {reverseRatings.map((rating) => (
                    <Col className="border py-3">
                        <div className="d-lg-flex justify-content-around align-items-center text-center">
                            <div>
                                <img
                                    src={rating.photo}
                                    alt="img not found"
                                    className="profile-photo-lg"
                                />
                                <h3 className="text-danger text-center">{rating.name}</h3>
                                <p>{rating.profession}</p>
                            </div>
                            <div className="w-100 p-5">
                                <p className="text-muted text-start">{rating.text} </p>
                                <div className="text-center">
                                    <Rating
                                        className="text-danger"
                                        emptySymbol="fa fa-star-o"
                                        fullSymbol="fa fa-star"
                                        initialRating={rating.rating}
                                        readonly
                                    />
                                </div>
                                <div className="d-lg-flex flex-row justify-content-center align-items-center mt-3">
                                    <button className="btn btn-primary me-3">
                                        Add To Homepage
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteReviewHandler(rating._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Review;
