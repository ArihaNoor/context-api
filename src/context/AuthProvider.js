import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { showErrorToastMessage, showSuccessToastMessage } from '../Components/Message';
import { useState } from 'react';
import { BASE_URL } from '../BaseURL/BaseURL';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    //Register
    const handleRegister = (uname, uemail, upass) => {
        setIsLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            name: uname,
            email: uemail,
            password: upass,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(`${BASE_URL}/register`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.success === true) {
                    showSuccessToastMessage("Successfully registered");
                    setIsLoading(false);
                    navigate("/login");
                } else {
                    showErrorToastMessage("Login failed");
                }
            })
            .catch((error) => {
                showErrorToastMessage(error.message);
            });
    }
    //Login 
    const handleLogin = (userEmail, password) => {
        setIsLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            email: userEmail,
            password: password,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(`${BASE_URL}/login`, requestOptions)
            .then((response) => response.json())
            .then((userObj) => {
                if (userObj.success === true) {
                    localStorage.setItem("user", JSON.stringify(userObj.user));
                    localStorage.setItem("token", userObj.token);
                    setIsLoading(false);
                    navigate("/main"); 
                } else {
                    showErrorToastMessage("Invalid credentials");
                }
            })
            .catch((error) => {
                showErrorToastMessage(error.message);
            });
    }
    return (
        <AuthContext.Provider value={{ handleRegister, handleLogin, isLoading, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("Auth context must be used with in auth provider")
    }
    return context;
}
export { AuthProvider, useAuthContext };
