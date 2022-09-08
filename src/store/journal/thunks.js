
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../herpers/fileUpload";
import { loadNotes } from "../../herpers/loadNotes";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
 
 
export const startNewNote = () => { 
 
  return async (dispatch, getState) => { 

    dispatch(savingNewNote());
 
    const uid = getState().auth.uid;
    
    const newNote = { 
      title: '',
      body: '',
      date: new Date().getTime()
    }
 
    try {
        const newDoc = await addDoc(collection(FirebaseDB, `${uid}/journal/notes`), newNote)
        newNote.id = newDoc.id;
    
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));

    } catch (e) {
      console.log(e)
    }
  }
}

export const startLoadingNotes = () =>{
    return async( dispatch, getState ) =>{
        const uid = getState().auth.uid;

        if(!uid) throw new Error('El UID del usuario no existe');

        const notes  = await loadNotes( uid );

        dispatch( setNotes(notes) )
    }
}

export const startSaveNote = () =>{
  return async ( dispatch, getState) =>{

    dispatch ( setSaving());

    const {uid} = getState().auth
    const {active:note} = getState().journal;

    const noteToFireStore = { ...note};
    delete noteToFireStore.id;

   
    const firestoreDoc = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
    await setDoc(firestoreDoc, noteToFireStore,{merge: true});

    dispatch ( updateNote( note ));
  }
}

export const startUploadingFiles = ( files = [] ) => {
  return async( dispatch ) => {
      dispatch( setSaving() );
          
      // await fileUpload( files[0] );
      const fileUploadPromises = [];
      for ( const file of files ) {
          fileUploadPromises.push( fileUpload( file ) )
      }

      const photosUrls = await Promise.all( fileUploadPromises );
      
      dispatch( setPhotosToActiveNote( photosUrls ));
      
  }
}

export const startDeletingNote = ( ) =>{
  return async( dispatch, getState ) =>{

    const {uid} = getState().auth;
    const { active: note } = getState().journal;

    const docRef = doc (FirebaseDB, `${uid}/journal/notes/${note.id}`);
    const resp = await deleteDoc(docRef);

    dispatch ( deleteNoteById(note.id) )

  

  }
}
