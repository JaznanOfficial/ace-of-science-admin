import React, { useEffect, useRef, useState } from "react";
import { Button, Container } from "react-bootstrap";
import "./Blog.css";
// import Swal from "sweetalert2";
import JoditEditor from "jodit-pro-react";
import GetBlog from "./GetBlog";
import swal from "sweetalert";

const Blog = () => {
    const editor = useRef(null);
    const [content, setContent] = useState("");

    const config = {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/,
        uploader: {
            url: "https://xdsoft.net/jodit/finder/?action=fileUpload",
        },
        filebrowser: {
            ajax: {
                url: "https://xdsoft.net/jodit/finder/",
            },
            height: 580,
        },
    };
    const blogHandler = (e) => {
        e.preventDefault();
        // setContent(e);
        setContent(editor.current.value);
        // console.log({ content });
        const data = { content }
        console.log(data);
        fetch("https://warm-citadel-00877.herokuapp.com/blogs", {
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
                    e.target.reset();
                }
            });
    };

    return (
        <div>
            <Container className="my-3">
                <h1 className="text-danger text-center">Write here your blog</h1>

                <div>
                    <JoditEditor
                      
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        // preferred to use only this option to update the content for performance reasons
                        onChange={(newContent) => {}}
                    />
                    <Button
                        onClick={blogHandler}
                        variant="outline-danger"
                        type="submit"
                        className="m-1"
                    >
                        <strong>Post this Blog</strong>
                    </Button>
                </div>
            </Container>
            <GetBlog></GetBlog>
        </div>
    );
};

export default Blog;
