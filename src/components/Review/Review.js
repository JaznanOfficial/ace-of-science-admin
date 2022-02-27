import React from "react";
import "./Review.css";
import ReactStars from "react-rating-stars-component";

const Review = () => {
    const ratingChanged = (newRating) => {
        console.log(newRating);
    };
    return (
        <div className="review">
            <div class="container">
                <div class="row">
                    <div class="col-md-8">
                        <div class="people-nearby">
                            <div class="nearby-user">
                                <div class="row">
                                    <div class="col-md-2 col-sm-2">
                                        <img
                                            src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                            alt="user"
                                            class="profile-photo-lg"
                                        />
                                    </div>
                                    <div class="col-md-7 col-sm-7">
                                        <h5>
                                            <a href="#" class="profile-link">
                                                Sophia Page
                                            </a>
                                        </h5>
                                        <p>Software Engineer</p>
                                        <p class="text-muted">All review text here</p>
                                        <ReactStars
                                            count={5}
                                            onChange={ratingChanged}
                                            size={24}
                                            activeColor="#ffd700"
                                        />
                                    </div>
                                    <div class="col-md-3 col-sm-3">
                                        <button class="btn btn-primary pull-right">
                                            Add To Homepage
                                        </button>
                                        <button class="btn btn-success pull-right mt-3">
                                            Add to Review page
                                        </button>
                                        <button class="btn btn-danger pull-right mt-3">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;
