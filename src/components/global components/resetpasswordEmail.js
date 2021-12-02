import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetMail } from "../../store/actions";
import {Link} from 'react-router-dom'

const Email = () => {
    const [email, setEmail] = useState("");
    const [validateEmail, setValidateEmail] = useState("");
    const [msg, setMsg] = useState("");
    const [color, setColor] = useState("");
    const [loader, setLoader] = useState(false);
    const [error,setError]= useState(false);

    const dispatch = useDispatch();

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
    const confirmEmail = () => {
        if (email && !validateEmail) {
            setLoader(true)
            let body = { email: email };
            dispatch(
                resetMail(body, () => {
                    //   console.log("confirmed Email");
                    setMsg(`Reset Password Link is sent to your email address:${email}`)
                    setColor("green")
                    setLoader(false)
                }, () => {
                    setError(true)
                    setMsg("Email doesnot exist");
                    setColor("red")
                    setLoader(false)
                })
            );
        }
        else 
        {
            setValidateEmail("Please enter a valid email");
            setLoader(false)
        }
    };

    return (
        <div className="container w-50 p-5">
            <div className="card d-flex flex-coulmn align-items-center p-3">
                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Enter email"
                    onChange={(event) => {
                        handleValidateEmail(event.target.value);
                    }}
                />
                <p
                    style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "red",
                        alignSelf: "flex-start",
                    }}
                >
                    {validateEmail}
                </p>
                {loader?(<>
                    <div class="spinner-border text-dark" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </>):(<></>)} 
                <button
                    type="submit"
                    className="btn btn-dark mt-3"
                    onClick={() => {
                        confirmEmail();
                    }}
                >
                    Submit
                </button>
                 
                <p style={{color}}>{msg}</p>

                {error?(<><Link to="/signup">
                    Please Signup
                </Link></>):(<></>)}

                {/* <p style={{color:"green"}}>Reset Password link is sent to your email address:{email}</p>  */}
            </div>
        </div>
    );
};

export default Email;
