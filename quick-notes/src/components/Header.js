import React from 'react';
import "../styles/header.css";
import "animate.css";
import {Link} from "react-router-dom";

function Header() {
    return (
        <div className="Navbar animate__animated animate__fadeIn"> 
            <h1>QuickNotes</h1>
            <div className="Navbar__links">
                <Link to="/">Home</Link>
                <a href="/">Starred</a>
                <a href="/">Sign In</a>
            </div>
        </div>
    )
}

export default Header
