import React,{useEffect,useContext,useState} from 'react'
import {useHistory} from "react-router-dom";
import {UserContext} from "../hooks/UserProvider";
import {firebaseApp} from "../firebase";
import "../styles/signin.css";
import {Link} from "react-router-dom";



function Signin() {
    let history=useHistory();
    const [user,setUser]=useContext(UserContext);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [emailError,setEmailError]=useState("");
    const [passwordError,setPasswordError]=useState("");
    const [hasAccount,setHasAccount]=useState(false);
    
    useEffect(()=>{
        console.log("User : ",user);
    },[user])
   
    const clearInputs=()=>{
        setEmail('');
        setPassword('');
    }

    const clearErrors=()=>{
        setEmailError('');
        setPasswordError('');
    }

    const handleLogin=()=>{
        
        clearErrors();
         firebaseApp
         .auth()
         .signInWithEmailAndPassword(email,password)
         .then(()=>{
            history.push("/");
         })
         .catch(err=>
            {
                switch(err.code)
                {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        clearInputs();
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        clearInputs();           
                        break;
                    }
            })
            
           
        }
    

    const handleSignup=()=>{
        
        clearErrors();
        firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email,password)
        .then(()=>{
            history.push("/");
         })
        .catch(err=>
           {
               switch(err.code)
               {
                   case "auth/email-already-in-use":
                   case "auth/invalid-email":
                   
                       setEmailError(err.message);
                       clearInputs();
                       break;
                   case "auth/weak-password":
                       setPasswordError(err.message);
                       clearInputs();           
                       break;
                   }
           })
              
   }


   const handleLogOut=()=>{
     
     firebaseApp.auth().signOut();
     localStorage.removeItem("user");   
     
   }

   const authListener=()=>{
       firebaseApp.auth().onAuthStateChanged((user)=>{
           if(user)
           {
               clearInputs();
               setUser(user);
               
           }
           else
           {
               setUser("");
           }
       });
   };

   useEffect(()=>{
       authListener();
   },[]);
    
    
    
    if(!user){
    return (
       
         <section className="login">
            <div className="loginContainer animate__animated animate__fadeIn">
                <label>Username</label>
                <input type="text" autofocus required value={email} onChange={e=>setEmail(e.target.value)} />
                <p className="errorMsg">{emailError}</p>
                <label>Password</label>
                <input type="password"  required value={password} onChange={e=>setPassword(e.target.value)} />
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    {hasAccount?
                    <>
                    <button className="logBtn" onClick={handleLogin}>Sign In</button>
                    <p>Don't have an account ? <span onClick={()=>setHasAccount(!hasAccount)}>Sign Up</span></p>
                    </>:<>
                    <button className="logBtn" onClick={handleSignup}>Sign Up</button>
                    <p>Have an account ? <span onClick={()=>setHasAccount(!hasAccount)}>Sign In</span></p>
                    
                    </>
                
                }
                </div>
                <span style={{fontSize:"0.75rem",color:"whitesmoke",fontWeight:"normal"}}>
                ( Demo Credentials -  User : demo@gmail.com | Password: 123456 )
                </span>    
            </div>
          </section>
        

)
    }
    else
    {

        return <div className="logout">
        <div className="logout__container">
            <h3 style={{color:"white",textAlign:"center",fontFamily: 'Libre Baskerville'}}>You are now logged in ! </h3>
            <div style={{display:"flex"}}>
                <Link style={{ marginRight:"1rem" }} to="/"><button className="logBtn">Go To Home</button></Link>
                <button className="logBtn" onClick={handleLogOut}>Log Out</button>
            </div>
        </div>
        </div>
       
    }
}

export default Signin
