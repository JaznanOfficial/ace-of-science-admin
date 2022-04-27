import React, { useEffect, useRef } from "react";

import swal from "sweetalert";
import GetNotes from "../GetNotes/GetNotes";
import "./Notes.css";

const Notes = () => {
    const pdfRef = useRef();
    const textRef = useRef();

    const noteSubmitHandler = (e) => {
        e.preventDefault();
        const pdfLink = pdfRef.current.value;
        const text = textRef.current.value;
        // console.log({ pdfLink, text });
        const data = { pdfLink, text };
        console.log(data);

        fetch("http://localhost:5000/notes", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.acknowledged === true);
                if (data) {
                    swal({
                        title: "Good job!",
                        text: "Your Blogs successfully posted! Please stay with us",
                        icon: "success",
                    });
                    pdfRef.current.value = "";
                    textRef.current.value = "";
                }
            });
        

        
        
    };
    return (
        <div className="container">
            <h1 className="text-center text-danger">Notes</h1>
            <form onSubmit={noteSubmitHandler}>
                <div className="form-group">
                    <label for="pdfLink">Link of pdf</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Pdf Link"
                        ref={pdfRef}
                    />
                </div>
                <div className="form-group mt-3">
                    <label for="exampleInputPassword1">Text</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="text that will appear on note card"
                        ref={textRef}
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                    Submit
                </button>
            </form>
        <GetNotes></GetNotes>
            
        </div>
    );
};

export default Notes;
