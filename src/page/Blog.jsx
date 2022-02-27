import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';

import './Blog.css'
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
export default function Blog() {
  const [editorState, seteditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    seteditorState(editorState);
  };
  return (
    <>
      <Container className='my-3'>
        <h1 className='text-danger text-center'>Write here your blog</h1>
        <Editor
          editorState={editorState}
          className="border"
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
        <Button variant="outline-danger" className='m-1'><strong>Post this Blog</strong></Button>
      </Container>
    </>
  );
}
