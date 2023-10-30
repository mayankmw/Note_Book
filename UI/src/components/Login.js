import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

    useEffect(()=>{
      if(localStorage.getItem('token')){
        navigate('/addnote');
      } 
    }, [])
    
    const [credentials,setCredentials] = useState({email: "",password: ""})
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password }),
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            //Save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            navigate("/addnote");
            props.showAlert("LoggedIn Successfully","success")
        }
        else{
            props.showAlert("Wrong Credentials","danger")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
    return (
        <div className='container mt-2'>
            <h2>Login to continue</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3 my-4">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} required/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
