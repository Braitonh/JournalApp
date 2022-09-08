import { collection, query, getDocs } from "@firebase/firestore";
import { FirebaseDB } from "../firebase/config";


export const loadNotes = async ( uid='' ) =>{
    if(!uid) throw new Error('El UID del usuario no existe');

    const notesSnap = await getDocs(query(collection(FirebaseDB, `${ uid }/journal/notes`)));
    const notes = [];
 
    notesSnap.forEach( snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
      });

  
 
    return notes

}