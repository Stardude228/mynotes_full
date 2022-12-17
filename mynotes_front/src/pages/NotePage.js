import React, { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg"

const NotePage = () => {
    // useNavigate funcition instead of history
    let navigate = useNavigate();

    // Note ID for getting the right page
    const routeParams = useParams();
    let noteId = routeParams.id
    
    // State for the updating notes 
    let [note, setNote] = useState(null)

    // Hook that allows to get the data once the note is opened 
    useEffect(() => {
        getNote()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noteId])

    // Async function to get the data
    let getNote = async () => {
        if (noteId === "new") return

        let response = await fetch(`/api/notes/${noteId}`)
        let data = await response.json()
        setNote(data)
    }
    
    // Async function to create new notes
    let createNote = async () => {
        await fetch(`/api/notes/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        })
    }

    // Async function to update the notes
    let updateNote = async () => {
        await fetch(`/api/notes/${noteId}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        })
    }

    // Function to delete the note
    let deleteNote = async () => {
        await fetch(`/api/notes/${noteId}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        navigate("/");
    }

    // Submission of changes of notes
    let handleSubmit = () => {
        if(noteId !== "new" && !note.body){
            deleteNote()
        }else if(noteId !== "new"){
            updateNote()
        }else if(noteId === "new" && note.body !== null){
            createNote()
        }
        navigate("/");
    }

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to="/">
                        <ArrowLeft onClick={handleSubmit} />
                    </Link>
                </h3>

                {noteId !== "new" ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>

            <textarea onChange={(e) => {setNote({...note, "body": e.target.value}) }} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage
