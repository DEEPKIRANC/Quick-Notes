import React,{useContext} from 'react';
import "../styles/header.css";
import "animate.css";
import {Link} from "react-router-dom";
import {UserContext} from "../hooks/UserProvider";
import {firebaseApp} from "../firebase";

function Header() {
    const [user,setUser]=useContext(UserContext);
 
 

    return (
        <div className="Navbar animate__animated animate__fadeIn"> 
            <h1>QuickNotes</h1>
            <div className="Navbar__links">
                <Link to="/">Home</Link>
                <Link to="/">Starred</Link>
                {user?<Link to="/login">Log Out</Link>:
                <Link to="/login">Sign In</Link>
                }
            </div>
        </div>
    )
}

export default Header
