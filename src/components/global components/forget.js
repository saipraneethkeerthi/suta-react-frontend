//Importing React Component from react library
import React, { Component, useState } from "react";
import {resetPassword} from "../../store/actions"
import {useDispatch} from "react-redux"
/**
 * @author:"Madhavi itikala and Spandana"
 * @returns {Html}
 * @description Implementation of Forgot Component, If user forgot password then we redirect this page.
 */
function Forget() {
	const dispatch =useDispatch()
  const userId=window.location.pathname.split('/')[3]

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [match,setMatch] = useState('');
  const [validatePassword, setValidatePassword] = useState("");


  const isUpper = (pswd) => {
    let format = /[A-Z]/;
    if (format.test(pswd)) {
      return true;
    } else {
      return false;
    }
  };
  const isLower = (pswd) => {
    let format = /[a-z]/;
    if (format.test(pswd)) {
      return true;
    } else {
      return false;
    }
  };

  const specialTest = (pswd) => {
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (format.test(pswd)) {
      return true;
    } else {
      return false;
    }
  };
  const isNumber = (pswd) => {
    let hasNumber = /\d/;
    if (hasNumber.test(pswd)) {
      return true;
    } else {
      return false;
    }
  };

  const handleValidatePassword = (password) => {
    let length = password.length;

    if (
      length >= 8 &&
      isUpper(password) &&
      isLower(password) &&
      specialTest(password) &&
      isNumber(password)
    ) {
      setValidatePassword("");
      setPassword(password);
      return true;
    } else {
      setValidatePassword("Please enter a valid password");
      return false;
    }
  };
  
  const handleConfirmPassword=(value)=>{
    
    if(password==value){
      setConfirmPassword(value)
      setMatch('')
    }else{
      setMatch("password not matched")
    }
  }

  const onSubmitPassword=()=>{
    let body ={id:userId,password:confirmPassword}
    dispatch(resetPassword(body,()=>{
      console.log("password reset successfully")
    }))
  }


	
	return (
		<>
			<div className="container d-flex flex-column align-items-center mt-3 p-5">
				<div className="card w-50 d-flex flex-column align-items-center p-5">
					<input
						type="text"
						className="form-control mb-3"
						placeholder="New Password"
						onChange={(e)=>handleValidatePassword(e.target.value)}
						/>

					<input
						type="text"
						className="form-control mb-3"
						placeholder="Confirm Password"
						onChange={(e)=>handleConfirmPassword(e.target.value)}
					/>
					{match ? <>
						<p style={{ fontSize: "12px", fontWeight: "bold", color: "red" }}>{match}</p>
					</> : ""}

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
