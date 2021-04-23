import React,{useState,useEffect,useContext} from 'react'
import "../styles/noteslist.css";
import {db} from "../firebase";
import {UserContext} from "../hooks/UserProvider";
import {removeHTMLTags} from "../helpers";
import NoteEditor from './NoteEditor';
import firebase from "firebase";

function NotesList() {

    const [user,setUser,,setShowInputSection]=useContext(UserContext);
    const [notes,setNotes]=useState([]);

    const [showEditor,setShowEditor]=useState(false);
    const [selectedNoteIndex,setSelectedNoteIndex]=useState("");
    const [selectNote,setSelectedNote]=useState({});

    useEffect(()=>{
        var userObj=localStorage.getItem("user");
        if(userObj)
        {
            setUser(JSON.parse(userObj));
            console.log("This is working!");
        }
        else
        {
            console.log("User Not set!");
        }
    },[setUser])

    useEffect(()=>{
        
        if(user)
        {
      
        db.collection("notes").where("userID","==",user.uid).orderBy("updatedAt","desc").onSnapshot(snapshot=>{
            const notesdb=snapshot.docs.map(doc=>{return {...doc.data(),id:doc.id}})
            console.log(notesdb);
            setNotes(notesdb);
            
        }
       
    )
    localStorage.setItem("user",JSON.stringify(user));
            console.log(user.uid);
    }
},[user])


const handleClick=(id)=>{
    setSelectedNoteIndex(id);
    setShowEditor(true);
    setShowInputSection(false);
    const noteObj=notes.filter(note=>note.id===id)[0];
    setSelectedNote(noteObj);
}





    if(!user || notes.length===0)
    {
    return (
        <div>
            <h2 style={{textAlign:"center",backgroundColor:"whitesmoke",fontFamily:"Libre Baskerville",paddingTop:"1rem"}}>Sample Notes</h2>
            <div className="notes">
                <div className="notes__notecard">
                    <h2>Title 1</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="links">
                        <span>Go To Editor</span>
                        <button>Delete this note</button>
                    </div>
                    <br/>
                    <span>Last Updated at Time : </span>
                </div>
                <div className="notes__notecard">
                    <h2>Title 2</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="links">
                        <span>Go To Editor</span>
                        <button>Delete this note</button>
                    </div>
                    <br/>
                    <span>Last Updated at Time : </span>
                </div>    
                <div className="notes__notecard">
                    <h2>Title 3</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="links">
                        <span>Go To Editor</span>
                        <button>Delete this note</button>
                    </div>
                    <br/>
                    <span>Last Updated at Time : </span>
                </div>    
            
            </div>
        </div>
    )
    }
    else
    {
        
        return ( <div>
             {showEditor && <NoteEditor 
             noteObj={selectNote} 
             notesList={notes} 
             selectedNoteIndex={selectedNoteIndex} 
             setShowEditor={setShowEditor} 
             />}
             <br />   
            <h2 style={{textAlign:"center",backgroundColor:"whitesmoke",fontFamily:"Libre Baskerville",paddingTop:"1rem",textDecoration:"underline"}}>My Notes</h2>
            <div className="notes">
                {notes.map(note=>
                <div key={note.id} className="notes__notecard">
                    <h2>{note.title}</h2>
                    <p>{note.content && removeHTMLTags(note.content.substring(0,30)) + '...'}</p>
                    <div className="links">
                        <span  onClick={()=>handleClick(note.id)}>
                           Go To Editor</span>
                        <button>Delete this note</button>
                    </div>
                    <br/>
                    <span><strong>Last Updated at</strong>: {note.updatedAt && note.updatedAt.toDate().toString()} </span>
                </div>
                )}    
            </div>
            </div>)
    }
    
}


export default NotesList
