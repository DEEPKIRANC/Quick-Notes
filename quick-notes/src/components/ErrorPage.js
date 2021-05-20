import React from 'react'
import {Link} from "react-router-dom";
function ErrorPage() {
    return (
        <div style={{textAlign:"center",marginTop:"50px"}}>
            404 Page Not Found
            <Link to="/">BACK TO HOME</Link>
        </div>
    )
}

export default ErrorPage
