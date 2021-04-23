import React,{useState,useRef,useContext} from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/noteeditor.css";
import debounce from "../helpers";
import {UserContext} from "../hooks/UserProvider";


function NoteEditor({noteList,selectedNoteId,setShowEditor}) {
   // const location=useLocation();
    const [user,setUser,showInputSection,setShowInputSection]=useContext(UserContext);
    const selectedNoteIndex=selectedNoteId;
    const noteObj=noteList.filter(note=>note.id===selectedNoteIndex)[0];
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
    
      
    const handleClick=()=>{
        setShowInputSection(true);
        setShowEditor(false);
    }
    return (
        <div>
            <ReactQuill value={text} onChange={updateBody} style={{height:"50vh"}} theme="snow">

            </ReactQuill>
            <div className="notesection">
                <div className="selectednote">
                    <h1>{noteObj.title}</h1>
                    <p>{noteObj.content}</p>
                    
                    <button className="back" onClick={handleClick}>Back to Notes</button>
                </div>
            </div>    
        </div>
    )
}

export default NoteEditor
