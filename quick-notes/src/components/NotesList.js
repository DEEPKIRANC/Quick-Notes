import React,{useState,useEffect,useContext} from 'react'
import "../styles/noteslist.css";
import {db} from "../firebase";
import {UserContext} from "../hooks/UserProvider";
import {removeHTMLTags} from "../helpers";
import NoteEditor from './NoteEditor';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import "animate.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function NotesList() {

    const [user,setUser,,setShowInputSection]=useContext(UserContext);
    const [notes,setNotes]=useState([]);
    const [bColor,setBColor]=useState("#fefae0");
    const [showEditor,setShowEditor]=useState(false);
    const [selectedNoteIndex,setSelectedNoteIndex]=useState("");
    const [selectNote,setSelectedNote]=useState({});

// Fetch user details in first render    

    useEffect(()=>{
        var userObj=localStorage.getItem("user");
        if(userObj)
        {
            setUser(JSON.parse(userObj));
           // console.log("This is working!");
        }
        else
        {
           // console.log("User Not set!");
        }
    },[setUser])

// Update local storage and notes array when user is changed    
    useEffect(()=>{
        
        if(user)
        {
      
        db.collection("notes").where("userID","==",user.uid).orderBy("updatedAt","desc").onSnapshot(snapshot=>{
            const notesdb=snapshot.docs.map(doc=>{return {...doc.data(),id:doc.id}})
          //  console.log(notesdb);
            setNotes(notesdb);
            
        }
       
    )
    localStorage.setItem("user",JSON.stringify(user));
          //  console.log(user.uid);
    }
},[user])

// handle note click event

const handleClick=(id)=>{
    setSelectedNoteIndex(id);
    setShowEditor(true);
    setShowInputSection(false);
    const noteObj=notes.filter(note=>note.id===id)[0];
    setSelectedNote(noteObj);
   
    // scroll to top
    window.scroll({
        top:0,
        behavior:'smooth'
    });
}

// handle delete note event
const deleteNote=(id)=>{
    var confirm=window.confirm("Do you want to delete this note ..?")
    if(confirm)
    {
        setShowEditor(false);
        setShowInputSection(true);
        db.collection("notes").doc(id).delete().then(()=>{
                toast.success("Note Deleted!",{position:"top-right"});
        });
        
}

}

// bookmarking feature

const handleBookmarks=(id,note)=>{

    // custom alert show/hide functionality
    if(!note.isBookmarked)
    {
      const elem=document.getElementById(id);
      setTimeout(()=>{
        elem.classList.add("show");  
      },0);
      setTimeout(()=>{
        elem.classList.remove("show");
      },1300);
    }


    db.collection("notes").doc(id).update({
    isBookmarked:!note.isBookmarked
    })
}

 

const spanStyle={
    color:"white",
    cursor:"pointer",
    fontSize:"0.90rem"
}

const head ={
    display:"flex",
    width:"100%",
    justifyContent:"space-between",
    alignItems:"center"
}




    if(!user || notes.length===0)
    {
    return (
        <div>
            <h2 style={{textAlign:"center",backgroundColor:"whitesmoke",fontFamily:"Libre Baskerville",paddingTop:"1rem"}}>Sample Notes</h2>
            <div className="notes">
                <div className="notes__notecard">
                    <div style={head}>
                        <h2>Title 1</h2>
                        <TurnedInNotIcon/>
                    </div>    
                    
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="links">
                        <span style={spanStyle}>Open Editor</span>
                       
                        <button>Delete this note</button>
                    </div>
                    <br/>
                    <span>Last Updated at Time : <strong>Sign In to Explore!</strong> </span>
                </div>
                <div className="notes__notecard">
                    <div style={head}>
                        <h2>Sign In to get started</h2>
                        <TurnedInNotIcon />
                    </div>    
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="links">
                        <span style={spanStyle}>Open Editor</span>
                        <button>Delete this note</button>
                    </div>
                    <br/>
                    <span>Last Updated at Time : <strong>Sign In to Explore!</strong></span>
                </div>    
                <div className="notes__notecard">
                    <div style={head}>
                        <h2>Title 3</h2>
                        <TurnedInNotIcon style={{color:"black"}} />
                    </div>    
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="links">
                        <span style={spanStyle}>Open Editor</span>
                        <button>Delete this note</button>
                    </div>
                    <br/>
                    <span>Last Updated at Time : <strong>Sign In to Explore!</strong></span>
                </div>    
            
            </div>
        </div>
    )
    }
    else
    {
        
        return (
            <>
            <div>
             {showEditor && <NoteEditor 
             noteObj={selectNote} 
             notesList={notes} 
             selectedNoteIndex={selectedNoteIndex} 
             setShowEditor={setShowEditor} 
             />}
             <br />   
            <div style={{backgroundColor:"whitesmoke"}}> 
            <div className="notes__header"> 
            <h2 style={{fontFamily:"Libre Baskerville",paddingTop:"1rem",textDecoration:"underline"}}>My Notes</h2>
            <span style={{fontFamily:"Libre Baskerville",marginTop:"1rem"}}>Pick a background color for note: </span><input type="color" value={bColor} onChange={(e)=>setBColor(e.target.value)} list="presetColors" />
                        <datalist id="presetColors">
                            <option value="#fefae0">#fefae0</option>
                            <option value="#ede9fe">#EDE9FE</option>
                            <option value="#fee2e2">#FEE2E2</option>
                            <option value="#d1fae5">#D1FAE5</option>
                            
                        </datalist>
            </div>            
            <div className="notes">
                {notes.map(note=>
                
                <div key={note.id} style={{backgroundColor:bColor}} className="notes__notecard special animate__animated animate__fadeIn">
                    <div style={head}>
                        <h2>{note.title}</h2>
                        
                        {note.isBookmarked?
                        <span style={{cursor:"pointer"}} onClick={()=>handleBookmarks(note.id,note)}>
                            <TurnedInIcon/>
                        </span>
                       
                        :
                            
                        <span style={{cursor:"pointer"}} onClick={()=>handleBookmarks(note.id,note)}>
                            
                            <TurnedInNotIcon />
                        </span>
                        }
                        <span id={note.id}  className="alert animate__animated animate__fadeIn">Note Bookmarked!</span>
                    </div>    
                    <p>{note.content && removeHTMLTags(note.content.substring(0,50))+"..."}</p>
                    <div className="links">
                        <span style={spanStyle} onClick={()=>handleClick(note.id)}>
                           Open Editor</span>
                        <button disabled={note.isBookmarked} style={note.isBookmarked ? {opacity:"0.2"}:null} onClick={()=>deleteNote(note.id)}>Delete this note</button>
                    </div>
                    <br/>
                    <span><strong>Last Updated at</strong>: {note.updatedAt && note.updatedAt.toDate().toString()} </span>
                </div>
                )}    
            </div>
            </div>
            </div>
            <ToastContainer/>
            </>
            )
    }
    
}


export default NotesList
