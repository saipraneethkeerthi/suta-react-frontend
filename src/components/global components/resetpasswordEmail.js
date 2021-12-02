import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetMail } from "../../store/actions";

const Email = () => {
  const [email, setEmail] = useState("");
  const [validateEmail, setValidateEmail] = useState("");
  const [msg, setMsg] = useState("");

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
      let body = { email: email };
      dispatch(
        resetMail(body, () => {
          console.log("confirmed Email");
          setValidateEmail("")
          setMsg("reset Password link is sent to your email address")
        })
      );
    }
    else setValidateEmail("Please enter a valid email");
  };

  return (
    <div className="container w-50 p-5">
      <div className="card d-flex flex-column align-items-center p-3">
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
        <button
          type="submit"
          className="btn btn-dark"
          onClick={() => {
            confirmEmail();
          }}
        >
          Submit
        </button>
        {msg?<><p style={{color:"green"}}>{msg}</p> </>:""}
        
      </div>
    </div>
  );
};

export default Email;
