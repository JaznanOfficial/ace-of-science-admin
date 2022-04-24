import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleBlog.css";

const SingleBlog = () => {
    

    const  {id}  = useParams();


    const [singleData, setSingleData] = useState([])
    
    useEffect(() => {
        fetch('https://warm-citadel-00877.herokuapp.com/blogs')
            .then(res => res.json())
        .then(data => setSingleData(data))
    }, [])
   

    const matchedData = singleData.find(singleBlog => singleBlog._id === id)


    const { content } = matchedData || {}
    console.log(content);


    return (
        <div className="single-blog container w-75 border border-rounded shadow my-3" dangerouslySetInnerHTML={{
            __html:  content
        }}>
            
        </div>
    );
};

export default SingleBlog;
