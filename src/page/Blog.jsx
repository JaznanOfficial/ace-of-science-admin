import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

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
      <Container>
        <h1>hi</h1>
        <Editor
          editorState={editorState}
          className="border"
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
      </Container>
    </>
  );
}
