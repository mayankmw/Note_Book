import React from 'react'
import { Link, useLocation } from "react-router-dom";
// import { UserOutlined } from '@ant-design/icons';
// import { Avatar, Space } from 'antd';

const Navbar = () => {
  let location = useLocation();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/about">MyNoteBook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/addnote" ? "active" : ""}`} to="/addnote">Add Notes</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/notes" ? "active" : ""}`} to="/notes">Your Notes</Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex" role="search">
            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
            </form>:<Link className="btn btn-primary" to="/logout" role="button">Logout</Link>}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar

