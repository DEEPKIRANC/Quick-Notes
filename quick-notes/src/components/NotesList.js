import React from 'react'
import "../styles/noteslist.css";
function NotesList() {
    return (
        <div>
            <h2 style={{textAlign:"center",backgroundColor:"whitesmoke",fontFamily:"Libre Baskerville",paddingTop:"1rem"}}>Sample Notes</h2>
            <div className="notes">
                <div className="notes__notecard">
                    <h2>Title 1</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="links">
                        <span><a href="/">Go To Editor</a></span>
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
                        <span><a href="/">Go To Editor</a></span>
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
                        <span><a href="/">Go To Editor</a></span>
                        <button>Delete this note</button>
                    </div>
                    <br/>
                    <span>Last Updated at Time : </span>
                </div>    
            
            </div>
        </div>
    )
}

export default NotesList
