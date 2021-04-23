import React,{useEffect,useState,useRef,useContext} from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/noteeditor.css";
import debounce from "../helpers";
import {UserContext} from "../hooks/UserProvider";
import {db} from "../firebase";


function NoteEditor({selectedNoteId,setShowEditor}) {
    const [user,setUser,showInputSection,setShowInputSection]=useContext(UserContext);
    
    
    const [noteList,setNoteList]=useState([]);
    const [noteObj,setNoteObj]=useState({});
     
    const [text,setText]=useState("");
    const [title,setTitle]=useState("");
    const [noteID,setNoteID]=useState("");
    
   useEffect(()=>{
    db.collection("notes").where("userID","==",user.uid).orderBy("updatedAt","desc").onSnapshot(snapshot=>{
        const notesdb=snapshot.docs.map(doc=>{return {...doc.data(),id:doc.id}})
        console.log(notesdb);
        setNoteList(notesdb);
        const selectedNoteIndex=selectedNoteId;
        const noteObject=notesdb.filter(note=>note.id===selectedNoteIndex)[0];
        setNoteObj(noteObject);
        setText(noteObject.content);
        setTitle(noteObject.title);
        setNoteID(noteObject.id);
    })

   },[])


    
   

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
            <ReactQuill value={text || ''} onChange={updateBody} style={{height:"50vh"}} theme="snow">

            </ReactQuill>
            <div className="notesection">
                <div className="selectednote">
                    <h1>{noteObj && noteObj.title}</h1>
                    <p>{noteObj && noteObj.content}</p>
                    
                    <button className="back" onClick={handleClick}>Back to Notes</button>
                </div>
            </div>    
        </div>
    )
}

export default NoteEditor
