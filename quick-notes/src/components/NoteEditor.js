import React,{useEffect,useState,useRef,useContext} from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/noteeditor.css";
import {useDebounce} from "../helpers";
import {UserContext} from "../hooks/UserProvider";
import {removeHTMLTags} from "../helpers";
import {db} from "../firebase";
import firebase from "firebase";


function NoteEditor({noteObj,notesList,selectedNoteId,setShowEditor,noteUpdate}) {
    const [,,,setShowInputSection]=useContext(UserContext);
    const [text,setText]=useState("");
    const [title,setTitle]=useState("");
    const [noteID,setNoteID]=useState("");
    
    useEffect(()=>{
        setText(noteObj.content);
        setTitle(noteObj.title);
        setNoteID(noteObj.id);     
},[selectedNoteId])


const updateBodyDebounce=useDebounce(text,1500);


useEffect(()=>{
    if(updateBodyDebounce)
    {
        db.collection("notes").doc(noteID).update({
            content:text,
            updatedAt:firebase.firestore.FieldValue.serverTimestamp()
        })
    }
},[updateBodyDebounce]);


    const updateBody=(val)=>{
        setText(val);
        }

   
    
      
    const handleClick=()=>{
        setShowInputSection(true);
        setShowEditor(false);
    }


    



    return (
        <div>
            <ReactQuill value={text || ''} onChange={updateBody} style={{height:"50vh"}} theme="snow">

            </ReactQuill>
            <div className="notesection">
                <div className="selectednote">
                    <h1>Title: {title}</h1>
                    <p>{removeHTMLTags(text)}</p>
                    
                    <button className="back" onClick={handleClick}>Back to Notes</button>
                </div>
            </div>    
        </div>
    )
}

export default NoteEditor
