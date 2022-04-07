import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleBlog.css";

const SingleBlog = () => {
    

    const  {id}  = useParams();


    const [singleData, setSingleData] = useState([])
    
    useEffect(() => {
        fetch('https://enigmatic-crag-58614.herokuapp.com/blogs')
            .then(res => res.json())
        .then(data => setSingleData(data))
    }, [])
   

    const matchedData = singleData.find(singleBlog => singleBlog._id === id)


    const {imageLink, heading, text} = matchedData ||{}


    return (
        <div className="single-blog container w-75">
            <div className="image-div mb-5 p-0">
                <img
                    src={imageLink}
                    alt=""
                />
            </div>
            <div>
                <h1 className="text-danger">{heading}</h1>
                <p className="text-start fs-5 fw-700">
                   {text}
                </p>
            </div>
        </div>
    );
};

export default SingleBlog;
