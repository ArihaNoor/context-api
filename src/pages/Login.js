import {  useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useAuthContext } from '../context/AuthProvider';
import { showErrorToastMessage } from "../Components/Message";

const Login = () => {
  const {handleLogin, isLoading} = useAuthContext();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();

  const HandleLogin = () => {
    if (!email || !password) {
      showErrorToastMessage('Input All Fields');
    } else {
      handleLogin( email, password);
    }
  };
  return (
    <LoginPage>
      <div id="login-page">
        <div className="login-left">
          <i className="fa fa-solid fa-user-check login-icon"></i>
          <h1>Login</h1>
          <p>Sign in to your Account..</p>
          <input
            type="email"
            placeholder="User Email"
            name="uemail"
            className="input-login"
            onChange={(e)=>setEmail(e.target.value)}
          ></input>
          <span className="span">*</span>
          <br />
          <input
            type="password"
            placeholder="Password"
            name="upass"
            className="input-login"
            onChange={(e)=>setPassword(e.target.value)}
          />
          <span className="span">*</span>
          <br></br>
          <button class="buttonload btn-login" onClick={()=>HandleLogin()}>
          {isLoading === true ? <i className="fa fa fa-spinner fa-spin"></i> : <i className=""></i>}
            Login
          </button>
          <br></br>
          <Link to="/register" className="link">
            <p>Don't Have an Account?</p>
          </Link>
          <Link to="/" className="link">
            <p>Home Page</p>
          </Link>
        </div>
      </div>
    </LoginPage>
  );
};

export default Login;

const LoginPage = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 2rem;
  #login-page{
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
  .login-icon {
    font-size: 3rem;
    color: #93c0e8;
  }
  #login-page h1 {
    font-size: 2rem;
    text-transform: uppercase;
  }
  .login-left {
    text-align: center;
    padding-top: 5rem;
    width: 80%;
  }
  .btn-login {
    background-color: #b7dbf3;
    border: none;
    width: 90%;
    height: 2.5rem;
    border-radius: 1rem;
    margin-top: 2rem;
    font-size: 1rem;
    font-weight: bold;
    color: #1a3242;
    box-shadow: 2px 2px 2px 2px #2c6182ad;
  }
  .btn-login:hover {
    border: 3px solid #b7dbf3;
    background-color: white;
    color: #1a3242;
  }
  .input-login {
    width: 80%;
    height: 5%;
    box-shadow: 2px 2px 2px 2px #93c0e8;
    padding: 0.5rem;
    margin-top: 1rem;
    border: none;
    background-color: #dbdbdb;
  }
  .span {
    color: red;
    font-size: 1.5rem;
  }

  .link {
    color: #1a3242;
  }
  @media (max-width: 700px){
    #login-page{
      width: 80%;
    }
`;