import React,{useState,useContext} from 'react'
import "../styles/notesinput.css";
import "animate.css";
import {UserContext} from "../hooks/UserProvider"
import {db} from "../firebase";
import firebase from "firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NotesInput() {
    const [user,,showInputSection,]=useContext(UserContext);
    const [title,setTitle]=useState("");
    const [note,setNote]=useState("");


    // function to add notes
    const handleClick=(e)=>{
        e.preventDefault();
        if(!user)
        {
            toast.warning("Please SignIn to add your notes!",{position:"top-right"})
            
        }
        else
        {
            if(title.trim().length<1 || note.trim().length<1)
            {
                toast.warning("This app doesn't accept blank values!",{position:"top-right"})
            }
            else
            {
                db.collection("notes").add({
                'userID':user.uid,
                'title':title,
                'content':note,
                'isBookmarked':false,
                createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt:firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(()=>{
                setNote('');
                setTitle('');
                toast.success("New Note Added!",{position:"top-right"});
            })
            .catch((error)=>{
                toast.error(error.message,{position:"top-right"});
            })
            
        }    
    }
}
    if(showInputSection)
    {
    // showing home page with add note view    
    return (
        <>
        <div className="inputsection">
            <div className="overview animate__animated animate__fadeIn">
                <h3>Welcome To QuickNotes</h3>
                <span>Add and Save Notes</span>
                <span>Use Our Interactive Editor to make changes in realtime</span>
                <span>Responsive Design , usable across devices of all sizes</span> 
                <span>Bookmark your Important notes </span> 
                <span>Pick a background color for your Note</span>
                <span style={{fontStyle:"italic"}}><strong>Sign In to Get Started</strong></span>   
            </div>
            <div className="noteinput animate__animated animate__fadeIn">
                <h3>Create New Note</h3>
                <form>
                    <div className="inputbox">
                        <input disabled={!user} type="text" className="inputs" value={title} placeholder="Add Title" onChange={e=>setTitle(e.target.value)}  />
                        <input disabled={!user} type="text" className="inputs" value={note} placeholder="Write Something" onChange={e=>setNote(e.target.value)} />
                        <button type="submit" onClick={handleClick}>Submit Note</button>
                    </div>
                </form>        
            </div>            
        </div>
        <ToastContainer/>
        </>
    )
    }
    else
    {
        // showing react quill editor and hiding *add note* view
        return <div><br/><h2>Welcome To QuickNotes</h2></div>
    } 
}

export default NotesInput
