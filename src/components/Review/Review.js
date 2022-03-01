import React from "react";
import "./Review.css";
import ReactStars from "react-rating-stars-component";
import { Col, Row } from "react-bootstrap";

const Review = () => {
    const ratingChanged = (newRating) => {
        console.log(newRating);
    };
    return (
        <div class="container my-3">
            <Row xs={1} md={1} className="g-4">
                <Col className="border py-3">
                    <div class="d-lg-flex justify-content-around align-items-center text-center">
                        <div>
                            <img
                                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                alt="user"
                                class="profile-photo-lg"
                            />
                            <p>Software Engineer</p>
                        </div>
                        <div className="w-100 p-5">
                            
                            <p class="text-muted text-start">ভাংতি টাকা পকেটে রাখা বা টাকা ভাংতি করার মতো এক্সট্রা ঝামেলা আর হয় না! একে তো কোথাও বের হওয়ার সময় পকেট চেক করে দেখতে হয় ভাংতি টাকা আছে কিনা, তার উপর টাকা ভাঙ্গাতে গেলেও অনেকরকম সমস্যা। এটিএম থেকে তো সবসময় ৫০০ টাকা, ১০০০ টাকার নোটেই দেয়, এগুলো ছোটোখাটো কিছু কিনেও বেশীরভাগ জায়গা থেকে ভাঙ্গানো যায় না। তার উপর কেউ যদি ভাংতি দেয়ও, তখন আমার চেক করতে হয় নোটগুলো ঠিক আছে কিনা। একটা সময় দুই টাকার নোট বেশীরভাগই পুরনো, ছিঁড়া-ফাড়া পেতাম, কিন্তু এখন সেই লিস্টে ৫ টাকা, ১০ টাকা, ২০ টাকা, ৫০ টাকা এমনকি ১০০ টাকার নোটও চলে আসছে। এই ছিঁড়া-ফাড়া নোট নিয়া আবার আরেক ঝামেলা। তাই বাধ্য হয়ে এখন যেখানে ডিজিটাল পেমেন্ট পাই, সেখান থেকেই যা কেনার কিনি। এখন বেশীরভাগ ডিজিটাল পেমেন্ট অ্যাক্সপ্ট করে এমন জায়গায় জিনিসপত্রের দামও হালকা বেশী হয়। বাট টাকা ভাংতি করা বা আরো বাড়তি ঝামেলার চাইতে ডিজিটালি টাকা ট্রানজেকশন করাই বেটার... </p>
                            <div className="text-center">
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                activeColor="#ffd700"
                                
                            />
                            </div>
                            <div className="d-lg-flex flex-row justify-content-center align-items-center mt-3">
                                <button class="btn btn-primary">Add To Homepage</button>
                                <button class="btn btn-success">
                                    Add to Review page
                                </button>
                                <button class="btn btn-danger">Remove</button>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Review;
