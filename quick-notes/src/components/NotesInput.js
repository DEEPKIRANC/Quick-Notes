import React,{useState,useContext} from 'react'
import "../styles/notesinput.css";
import "animate.css";
import {UserContext} from "../hooks/UserProvider"
import {db} from "../firebase";
import firebase from "firebase";

function NotesInput() {
    const [user,setUser]=useContext(UserContext);
    const [title,setTitle]=useState("");
    const [note,setNote]=useState("");

    const handleClick=(e)=>{
        e.preventDefault();
        if(!user)
        {
            alert("Please SignIn to add your notes!")
        }
        else
        {
            if(title.trim().length<1 || note.trim().length<1)
            {
                alert("This app doesn't accept blank values!");
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
                alert("New Note Added!");
            })
            .catch((error)=>{
                alert(error.message);
            })
            
        }    
    }
}
    return (
        <div className="inputsection">
            <div className="overview animate__animated animate__fadeIn">
                <h3>Welcome To QuickNotes</h3>
                <span>Add and Save Notes</span>
                <span>Use Our Interactive Editor to make changes in realtime</span>
                <span>Bookmark your Important notes </span> 
                <span>Arrange your notes based on time of creation / updation</span> 
                <span>Pick a background color for your Note</span>
                <span>Delete a Note</span>   
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
    )
}

export default NotesInput
