//Importing React component from React Library
import React, { Component, useState } from "react";


//Importing Link from React Router Dom
import { Link,useHistory } from "react-router-dom";
//Importing reusable Components 
import Input from "../../reusable components/input"
import Button from "../../reusable components/button"
//imorting axios
import axios from 'axios'
import {loginUserAuth} from "../../../store/actions"
import {useDispatch} from "react-redux"
/**
 * @authors:"madhavi itikala and Spandana"
 * @returns {Html}
 * Creating a functional component and returns UI on the browser.
 * Implementation of Login Component using States.
 */
function Login() {
  const dispatch=useDispatch()
  const history=useHistory()
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signupVisible, setSignupVisible] = useState(false);
  const [invalidDetails, setInvalidDetails] = useState(false);
  const onSubmit = () => {
    
    const body = { userName, password };
    dispatch(loginUserAuth(body,()=>{
    alert("logged in successfully")
    history.push('/')
    }))
    
    // axios.post("http://localhost:1109/login", body).then((response) => {
    //   console.log(response)
      
    //   // alert("logged in successfully")
    //   // window.location.href='/'
    //   }).catch(error => setInvalidDetails(true))

  };
  

  return (
    <>
      <div className="container mt-5">
        <div className="row d-flex flex-row justify-content-center align-items-center">
          <div className="d-flex flex-column justify-content-center">
            <div
              className="card p-3 shadow-lg"
              style={{ borderRadius: "10px", width: "600px" }}
            >
            
              <h1 className="heading text-center">Login to SuTa</h1>
              <div className="form">
                <label
                  for="email"
                  className="col-12 font-weight-bold"
                  style={{ fontSize: "10px" }}
                >
                  Username or Email
                </label>
                <Input
                  className="form-control col-12"
                  id="email"
                  type="text"
                  handleChange={(child) => setUserName(child)}
                />
                <label
                  for="passsword"
                  className="col-12 font-weight-bold"
                  style={{ fontSize: "10px" }}
                >
                  Password
                </label>
                <Input
                  className="form-control col-12"
                  id="password"
                  type="password"
                  handleChange={(child) => setPassword(child)}
                />
                <Link to="/forget">
                  <p className="col-12 text-right">Forget Password?</p>
                </Link>
                <Link to="/signup">Create account</Link>
                <div className="d-flex flex-column align-items-center">
                  
                  <Button
                    className="btn btn-primary"
                    handleClick={() => onSubmit()}
                    value="Submit"
                  >Submit</Button>   
               
                </div>
               
                <p className="text-danger">{error}</p>
                
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
