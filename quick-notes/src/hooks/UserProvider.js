import React,{useState,createContext} from "react";

export const UserContext=createContext("");

export const UserProvider=(props)=>{
    const [user,setUser]=useState("");
    const [showInputSection,setShowInputSection]=useState(true);
    return <UserContext.Provider value={[user,setUser,showInputSection,setShowInputSection]}>
        {props.children}
    </UserContext.Provider>    
}