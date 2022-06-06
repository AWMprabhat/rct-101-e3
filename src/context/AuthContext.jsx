

import React, { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const login = (email, password) => {
    axios
      .post("https://reqres.in/api/login", { email, password })
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        setIsAuth(data.token);
      });
  };

  const logout = () => {
    localStorage.setItem("token", "");
    setIsAuth(false);
  };

  useEffect(() => {
    if (isAuth) {
      navigate(from, { replace: true });
    } else {
      navigate("/login");
    }
  }, [isAuth, from, navigate]);

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

