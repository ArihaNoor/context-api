import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from "sweetalert";
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
                    Swal({
                        title: "Success",
                        text: "Successfully registered",
                        icon: "success",
                    }).then(() => {
                        setIsLoading(false);
                        navigate("/login");
                    });
                } else {
                    Swal({
                        title: "Error",
                        text: "Registration failed",
                        icon: "error",
                    });
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                Swal({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                });
                setIsLoading(false);
            });
    };
    
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
    
                    Swal({
                        title: "Success",
                        text: "Login successful",
                        icon: "success",
                    });
                } else {
                    Swal({
                        title: "Error",
                        text: "Invalid credentials",
                        icon: "error",
                    });
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                Swal({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                });
                setIsLoading(false);
            });
    };
    
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
