import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [Errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    setErrors({});
    setCredential("");
    setPassword("");
  }, [closeModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    
    
      dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          setErrors(data.errors)
        }
      );
  
      // if (errors.response) {
      //   // Backend returned error messages
      //   errors.credential = 'Credential not Valid'
      //   setErrors(errors);
      // } else {
      //   // Other error occurred, handle it as needed
      // }
  
  };
  
  

  const handleDemoLogin = () => {
    dispatch(
      sessionActions.login({
        credential: "Demo-lition", 
        password: "password", 
      })
    )
  };

  const isFormValid = credential.length < 4 || password.length < 6;

  // useEffect(() => {
  //   setErrors({});
  // }, [credential, password]);

  if (sessionUser) {
    // Hide login and signup buttons
    return null;
  }

  return (
    <>
    <div className="login-wrapper">

      <h1>Log In</h1>
       {Errors.message && (<p>{Errors.message}</p>)}
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={isFormValid}>
          Log In
        </button>
        <button type="button" onClick={handleDemoLogin}>
          Log in as Demo User
        </button>
      </form>
    </div>
    </>
  );
}

export default LoginFormModal;
