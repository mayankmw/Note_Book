import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const { note, updateNote } = props;
    return (
        <div className='col-md-4'>
            <div className="card my-3" style={{width: "18rem"}}>
                <div className="card-body">
                    <div className="d-flex">
                    <h5 className="card-title flex-grow-1">{note.title}</h5>
                    <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Note Deleted","warning");}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    
                </div>
            </div>
        </div>
    )
}

export default Noteitem
