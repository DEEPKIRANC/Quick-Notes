import React from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function NoteEditor() {
    return (
        <div>
            <ReactQuill style={{height:"100vh"}} theme="snow">

            </ReactQuill>
        </div>
    )
}

export default NoteEditor
