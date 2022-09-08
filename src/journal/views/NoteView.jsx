import { useDispatch, useSelector } from "react-redux";
import { useEffect,useMemo, useRef } from "react";



import { useForm } from "../../hooks/useForm";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks";
import { ImageGallery } from "../components";
 
import { SaveOutlined, UploadOutlined,DeleteOutline } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";



export const NoteView = () => {

    const dispatch = useDispatch();

    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal);

    const {body, title, date, onInputChange, formState} = useForm(note);

    

    const dateString = useMemo( () =>{

        const newdate = new Date (date);

        return newdate.toUTCString();

    }, [date] )

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch( setActiveNote(formState) );
    }, [formState]);

    useEffect(() => {
        if( messageSaved.length > 0){
            Swal.fire(
                'Nota Actualizada!',
                messageSaved,
                'success'
              )
        }
    

    }, [messageSaved])
    
    
    const onSaveNote = ( ) =>{
        dispatch (startSaveNote());
    }

    const onFileInputChange = ({target}) =>{
        if(target.files === 0) return;

        dispatch (startUploadingFiles ( target.files ))
    }

    const onDelete = () =>{
        dispatch (startDeletingNote ());
    }

    return (
        <Grid className="animate__animated animate__fadeIn " container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight='light'> {dateString} </Typography>
            </Grid>
            <Grid item>

                <input
                    type='file'
                    multiple
                    onChange={onFileInputChange}
                    ref= {fileInputRef}
                    style = {{display: 'none'}}
                />

                <IconButton
                    color='primary'
                    disabled = {isSaving}
                    onClick= { () => fileInputRef.current.click() }
                >
                    <UploadOutlined/>
                </IconButton>

                <Button color='primary' sx={{ padding: 2 }} onClick = {onSaveNote} disabled = {isSaving}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label='Título'
                    sx={{ border: 'none', mb: 1 }}
                    name='title'
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedío en el día hoy?"
                    label='Descripcíon'
                    minRows={5}
                    name='body'
                    value={body}
                    onChange={onInputChange}
                    sx={{ mb:3 }}
                />

                <Grid container justifyContent = 'end'>
                    <Button
                        onClick={onDelete}
                        sx={{mt:2}}
                        color = 'error'
                    >
                        <DeleteOutline/>
                        Borrar
                    </Button>
                </Grid>

                <ImageGallery
                    images = {note.imageUrls}

                />
            </Grid>
        </Grid>
    )
}