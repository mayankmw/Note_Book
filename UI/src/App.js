import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <div>
      <NoteState>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Login showAlert={showAlert}/>} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/addnote" element={<AddNote showAlert={showAlert}/>} />
            <Route exact path="/notes" element={<Notes showAlert={showAlert}/>} />
            <Route exact path="/login" element={<Login showAlert={showAlert}/>}  />
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}  />
            <Route exact path="/logout" element={<Logout showAlert={showAlert}/>} />
          </Routes>
        </div>
      </NoteState>
    </div>
  );
}

export default App;

