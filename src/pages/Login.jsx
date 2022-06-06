
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [loginCreds, setLoginCreds] = useState({
    email: "eve.holt@reqres.in",
    password: "cityslicka",
  });
  const { login } = useContext(AuthContext);

  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setLoginCreds({
      ...loginCreds,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginCreds.email && loginCreds.password) {
      login(loginCreds.email, loginCreds.password);
    }
  };
  return (
    <div>
      Login
      <form
        onSubmit={handleSubmit}
        style={{
        
          margin: "auto",
          maxWidth: "200px",
          gap: "10px",
        }}
      >
        <input
          data-cy="login-email"
          name="email"
          type="email"
          placeholder="Enter Email"
          value={loginCreds.email}
          onChange={hanldeChange}
        />
        <input 
          style={{
        backgroundColor:'teal',
           padding:'4px',
           fontSize:'12px',
          }}
          data-cy="login-password"
          name="password"
          type="password"
          placeholder="Enter Password..."
          value={loginCreds.password}
          onChange={hanldeChange}
        />
        <button
          style={{
     
        color:'white',
          cursor:'pointer'
          }}
        data-cy="login-submit" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
