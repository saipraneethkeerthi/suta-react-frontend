//Importing React Component from react library
import React, { Component, useState } from "react";

/**
 * @author:"Madhavi itikala and Spandana"
 * @returns {Html}
 * @description Implementation of Forgot Component, If user forgot password then we redirect this page.
 */
function Forget() {
  const userId=window.location.pathname.split('/')[3]
  const onSubmitPassword = () => {
    if(password && confirmPassword){

    }
  //   setPass(true);
  //   setTimeout(()=>{
  //     window.location.href = "/login"
  //   },1000)
  };

  const handle=(value)=>{
    
    if(password==value){
      setConfirmPassword(value)
      setMatch('')
    }else{
      setMatch("password not matched")
    }
  }
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [match,setMatch] = useState('');
  return (
    <>
      <div className="container d-flex flex-column align-items-center mt-3 p-5">
        <div className="card w-50 d-flex flex-column align-items-center p-5">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="New Password"
            onChange={(e)=>setPassword(e.target.value)}
          />
        
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Confirm Password"
            onChange={(e)=>handle(e.target.value)}

          />
            {match?<>
          <p style={{ fontSize: "12px", fontWeight: "bold", color: "red" }}>{match}</p>
          </>:""}
      
          <button className="btn btn-primary" onClick={() => onSubmitPassword()}>
          
            Submit
          </button>
{/*           
          {pass ? (
            <>
              <p>password changed successfully</p>
            </>
          ) : (
            ""
          )} */}
        </div>
      </div>

    </>)
}

export default Forget;
