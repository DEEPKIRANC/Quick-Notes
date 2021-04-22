import React,{useState,useRef} from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/noteeditor.css";
import {Link} from "react-router-dom";
import debounce from "../helpers";

function NoteEditor() {
    const [text,setText]=useState("");
    
    const updateBody=(val)=>{
        setText(val);
        update();      
    }

    const update=useRef(
        debounce(()=>{
            console.log("Updating database");
        },1500)
        
    ).current
    
      
    return (
        <div>
            <ReactQuill value={text} onChange={updateBody} style={{height:"50vh"}} theme="snow">

            </ReactQuill>
            <div className="notesection">
                <div className="selectednote">
                    <h1>Note Title</h1>
                    <p>Note content ....random text..random text..random text</p>
                    
                    <button className="back"><Link style={{color:"black",textDecoration:"none"}} to="/">Back to Notes</Link></button>
                </div>
            </div>    
        </div>
    )
}

export default NoteEditor
