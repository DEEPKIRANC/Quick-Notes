import React,{useState,useEffect,useContext} from 'react'
import "../styles/noteslist.css";
import {db} from "../firebase";
import {UserContext} from "../hooks/UserProvider";
import Editor from "./NoteEditor";

function NotesList() {

    const [user,setUser,showInputSection,setShowInputSection]=useContext(UserContext);
    const [notes,setNotes]=useState([]);

    const [showEditor,setShowEditor]=useState(false);
    const [selectedNoteIndex,setSelectedNoteIndex]=useState("");

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
    },[])

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
        if(!showEditor)
        {
        return ( <div>
            <h2 style={{textAlign:"center",backgroundColor:"whitesmoke",fontFamily:"Libre Baskerville",paddingTop:"1rem"}}>Sample Notes</h2>
            <div className="notes">
                {notes.map(note=>
                <div key={note.id} className="notes__notecard">
                    <h2>{note.title}</h2>
                    <p>{note.content}</p>
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
    else
    {
        return <Editor noteList={notes} selectedNoteId={selectedNoteIndex} setShowEditor={setShowEditor}/>
    }
}
}

export default NotesList
