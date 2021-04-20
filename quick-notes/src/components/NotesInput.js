import React from 'react'
import "../styles/notesinput.css";
import DoneAllIcon from '@material-ui/icons/DoneAll';


function NotesInput() {
    return (
        <div className="inputsection">
            <div className="overview">
                <h3>Welcome To QuickNotes</h3>
                <span><DoneAllIcon/>Add and Save Notes</span>
                <span><DoneAllIcon />Use Our Interactive Editor to make changes in realtime</span>
                <span><DoneAllIcon />Bookmark your Important notes </span> 
                <span><DoneAllIcon />Arrange your notes based on time of creation / updation</span> 
                <span><DoneAllIcon />Delete a Note</span>   
            </div>
            <div className="noteinput">Input section of this app</div>            
        </div>
    )
}

export default NotesInput
