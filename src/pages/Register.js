import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { showErrorToastMessage } from '../Components/Message';
import { useAuthContext } from '../context/AuthProvider';
import { ToastContainer } from 'react-toastify';

const Register = () => {
  const { handleRegister, isLoading } = useAuthContext();
  const [username, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const HandleRegister = () => {
    if (!username || !userEmail || !userPassword) {
      showErrorToastMessage('Input All Fields');
    } else {
      handleRegister(username, userEmail, userPassword);
    }
  };

  return (
    <RegisterPage>
      <ToastContainer />
      <div id="register-page">
        <div className="register-left">
          <i className="fa fa-solid fa-user-plus register-icon"></i>
          <h1>Create Account</h1>
          <p>Create Your New Account...</p>
          <input
            type="text"
            placeholder="User Name"
            name="uname"
            className="input"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <span className="span">*</span>
          <br />
          <input
            type="email"
            placeholder="User Email"
            name="uemail"
            className="input"
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          <span className="span">*</span>
          <br />
          <input
            type="password"
            placeholder="Password"
            name="upass"
            className="input"
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
          <span className="span">*</span>
          <br />
          {userPassword.length < 8 ? (
            <p className="password">Password Must Contain at least 8 characters</p>
          ) : (
            <p></p>
          )}
          <br />
          <button className="buttonload btn-register" onClick={() => HandleRegister()}>
            {isLoading === true ? <i className="fa fa fa-spinner fa-spin"></i> : <i className=""></i>}
            Register
          </button>
          <Link to="/login" className="link">
            <p>Already Have an Account?</p>
          </Link>
          <Link to="/" className="link">
            <p>Home Page</p>
          </Link>
        </div>
      </div>
    </RegisterPage>
  );
};

export default Register;

const RegisterPage = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 2rem;
  #register-page{
    background-color: white;
    width: 35%;
    box-shadow: 2px 2px 3px 3px #93c0e8;
    border-radius: 2rem;
    color: #1a3242;
    display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 90vh;
 }
 .register-icon{
    font-size: 3rem;
    color: #93c0e8;
 }
 #register-page h1{
     font-size: 2rem;
     text-transform: uppercase;
 }
 .register-left{
     text-align: center;
     padding-top: 2rem;
     width: 80%;
 }
 .btn-register{
     background-color: #b7dbf3;
     border: none;
     width: 90%;
     height: 2.5rem;
     border-radius: 1rem;
     margin-top: 1rem;
     font-size: 1rem;
     font-weight: bold;
     color: #1a3242;
     box-shadow: 2px 2px 2px 2px #2c6182ad;
 }
 .btn-register:hover{
     border: 3px solid #b7dbf3;
     background-color: white;
     color: #1a3242;
 }
 .input{
     width: 80%;
     height: 5%;
     box-shadow: 2px 2px 2px 2px #93c0e8;
     padding: 0.5rem;
     margin-top: 1rem;
     border: none;
     background-color: #dbdbdb;
 }
 .span{
     color: red;
     font-size: 1.5rem;
 }

 .link{
    color: #1a3242;
 }
 .password{
    font-size: 10px;
    color: grey;
}
@media (max-width: 700px){
  #register-page{
    width: 80%;
  }
  `;
