import React from 'react';
import "../styles/header.css";

function Header() {
    return (
        <div className="Navbar"> 
            <h1>QuickNotes</h1>
            <div className="Navbar__links">
                <a href="/">Home</a>
                <a href="/">Starred</a>
                <a href="/">Sign In</a>
            </div>
        </div>
    )
}

export default Header
