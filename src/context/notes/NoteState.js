import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000/"
  const notesInitial = [ ]
  const [notes, setNotes] = useState(notesInitial)

  //Get All Note
  const getNotes = async () => {
    //API Call
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyOGY5YjlmY2IyNmNkM2Q5MDUyMjExIn0sImlhdCI6MTY5NzE5NjAwNX0.0fzqMtba1WhI0DGBFTWBF20SyBLXXtlVMd6YGiiSNaM"
      },
      
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  //Add Note
  const addNote = async (title, description, tag) => {
    //API Call
    const response = await fetch(`${host}api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyOGY5YjlmY2IyNmNkM2Q5MDUyMjExIn0sImlhdCI6MTY5NzE5NjAwNX0.0fzqMtba1WhI0DGBFTWBF20SyBLXXtlVMd6YGiiSNaM"
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = response.json()

    console.log("Adding a new note")
    const note = {
      "_id": "652ceabc2b45e1d3cc30114r6",
      "user": "6528f9b9fcb26cd3d9052211",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-10-16T07:48:12.473Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }

  //Edit Note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyOGY5YjlmY2IyNmNkM2Q5MDUyMjExIn0sImlhdCI6MTY5NzE5NjAwNX0.0fzqMtba1WhI0DGBFTWBF20SyBLXXtlVMd6YGiiSNaM"
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = response.json()

    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }

    }
  }


  //Delete Note
  const deleteNote = async(id) => {
    // To do  API call
    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyOGY5YjlmY2IyNmNkM2Q5MDUyMjExIn0sImlhdCI6MTY5NzE5NjAwNX0.0fzqMtba1WhI0DGBFTWBF20SyBLXXtlVMd6YGiiSNaM"
      },
    });
    const json = response.json();
    console.log(json)
    console.log("Deleting Note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}

export default NoteState;