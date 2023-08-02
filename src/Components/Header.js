//Required Imports
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BASE_URL } from "../BaseURL/BaseURL";
import {showErrorToastMessage,showSuccessToastMessage} from './Message';
import { useNavigate } from "react-router-dom";

//Header Function
const Header = () => {
  //getting local storage data
  let data = localStorage.getItem("user");
  //parsing data from string to object
  const user = JSON.parse(data);
  //using useNavigate Hook
  const navigate = useNavigate();

  //Handle Logout 
  const handleLogout = () => {
    let token = localStorage.getItem("token");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `JWT ${token}`);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${BASE_URL}/logout`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          showSuccessToastMessage('Logged out successfully.');
          navigate("/");
        }else{
          showErrorToastMessage('User not logged out');
        }
      })
      .catch((error) => showErrorToastMessage("Error : " + error.message));
  };
  return (
    <HeaderComponent>
      <div id="header">
        <div className="logo">
          <h1>Todo List</h1>
        </div>
        <div className="logout">
          <h3>Logged In as: {user?.name}</h3>
          <button className="logout-btn" onClick={()=>handleLogout()}>
            <Link className="logout-link">LOGOUT</Link>
          </button>
        </div>
      </div>
    </HeaderComponent>
  );
};

export default Header;

//Styled Components
const HeaderComponent = styled.div`
    #header {
      background-color: #1a3242;
      color: white;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .logo {
      width: 50%;
    }

    .logo h1 {
      margin-left: 3rem;
    }

    .logout {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 50%;
      gap: 0.5rem;
    }

    .logout-btn {
      font-size: 1rem;
      font-weight: bold;
      padding: 0.7rem;
      border-radius: 0.5rem;
      background-color: #93c0e8;
    }
    .logout-link {
      color: white;
      text-decoration: none;
    }
    @media (max-width: 700px){
      .logout{
        flex-direction: column;
      }
  `;