import React,{useState} from 'react'
import "../styles/notesinput.css";
import DoneAllIcon from '@material-ui/icons/DoneAll';


function NotesInput() {
    const [title,setTitle]=useState("");
    const [note,setNote]=useState("");
    return (
        <div className="inputsection">
            <div className="overview">
                <h3>Welcome To QuickNotes</h3>
                <span><DoneAllIcon/>Add and Save Notes</span>
                <span><DoneAllIcon />Use Our Interactive Editor to make changes in realtime</span>
                <span><DoneAllIcon />Bookmark your Important notes </span> 
                <span><DoneAllIcon />Arrange your notes based on time of creation / updation</span> 
                <span><DoneAllIcon />Pick a background color for your Note</span>
                <span><DoneAllIcon />Delete a Note</span>   
            </div>
            <div className="noteinput">
                <h3>Create New Note</h3>
                <form>
                    <div className="inputbox">
                        <input type="text" className="inputs" value={title} placeholder="Add Title" onChange={e=>setTitle(e.target.value)}  />
                        <input type="text" className="inputs" value={note} placeholder="Write Something" onChange={e=>setNote(e.target.value)} />
                        <button type="submit">Submit Note</button>
                    </div>
                </form>        
            </div>            
        </div>
    )
}

export default NotesInput
