import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(()=>{
    getNotes()
  },[])
  return (
    <div className="row my-3">
      <h2>Your Notes</h2>
      {notes.map((notes) => {
        return <Noteitem key={notes._id} note={notes} />
      })}
    </div>
  )
}

export default Notes
