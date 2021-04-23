import {useState,useEffect,useContext} from "react";
import {db} from "../firebase";
function useFirestore(collection,id) {
    const [notes,setNotes]=useState([]);
    
    useEffect(() => {
        const unsub=db.collection(collection).where("userID","==",id).orderBy("updatedAt","desc").onSnapshot((snap)=>{
        let noteList = [];
        snap.forEach(note=>{noteList.push(note.data());    
        }) ;
        setNotes(noteList);
        console.log("In Firestore hook : ",id);
        console.log("In Firestore hook : ",notes);
    });
        return () => unsub();
    }, [collection,id])
    
    return {notes,setNotes}
}

export default useFirestore