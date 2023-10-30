import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }
    else{
      navigate('/');
    }
  }, [])
  const ref = useRef(null);
  const refClose = useRef(null);

  const [note,setNote] = useState({id: "", utitle: "", udescription: "", utag: ""})


  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, utitle: currentNote.title, udescription: currentNote.description, utag: currentNote.tag});
  }
  

  const handleUpdateNote = (e) => {
    console.log("Updating the note...", note)
    editNote(note.id, note.utitle, note.udescription, note.utag);
    refClose.current.click();
    props.showAlert("Note Updated","success");
}
const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
}
  return (
    <>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="utitle" name="utitle" value={note.utitle} onChange={onChange} minLength={2} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="udescription" name="udescription" value={note.udescription} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="utag" name="utag" value={note.utag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.utitle.length<2 ||note.udescription.length<5} type="button" className="btn btn-primary" onClick={handleUpdateNote}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
        {notes.length===0 && 'No Notes To Display'}
        </div>
        {notes.map((notes) => {
          return <Noteitem key={notes._id} updateNote={updateNote} showAlert={props.showAlert} note={notes} />
        })}
      </div>
    </>
  )
}

export default Notes
