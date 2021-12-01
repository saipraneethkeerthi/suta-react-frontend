import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import {resetMail} from '../../store/actions'

const Email = () => {
    const [email,setEmail]=useState("");
    const [validateEmail,setValidateEmail]=useState("")
    const dispatch =useDispatch()

    const handleValidateEmail = (email) => {
        let regexEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        if (email.match(regexEmail)) {
          setValidateEmail("");
          setEmail(email);
          return true;
        } else {
          setValidateEmail("Please enter a valid email");
          return false;
        }
      };
      const confirmEmail=()=>{
          let body={email:email}
        dispatch(resetMail(body,()=>{
            console.log("confirmed Email")
        }))
      }

    return (
        <div className="container w-50 p-5">
            <div className="card d-flex flex-coulmn align-items-center p-3">
                <input type="email" className="form-control mb-3" placeholder="Enter email" onChange={(event)=>{ handleValidateEmail(event.target.value)}} />
                <p>{validateEmail}</p>
                <button type="submit" className="btn btn-dark" onClick={()=>{confirmEmail()}}>Submit</button>
                <p style={{color:"green"}}>Reset Password link is sent to your email address:{email}</p> 
                {console.log(email)}
            </div>
        </div>
    );
}

export default Email;
