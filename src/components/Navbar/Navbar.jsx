// import React from "react";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

// use react-router Link or NavLink

const Navbar = () => {
  const { isAuth, logout } = useContext(AuthContext);
  const { cartItemsCount } = useContext(CartContext);
  const navigate = useNavigate();
  const handleLoginClick = () => {
    // login 

    if (isAuth) {
      logout();
        // logout

    } else {
      //  to login
      navigate("/login");
    }
  };
  return (
    <div
      data-cy="navbar"
      style={{
        padding: "4px",
        display: "flex",
       backgroundColor:"teal",
        gap: "20px",
        justifyContent: "space-around",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Link data-cy="navbar-home-link" to="" >
          Logo
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <div data-cy="navbar-cart-items-count">
          Cart: {cartItemsCount && `(${cartItemsCount})`}
        </div>
        <button data-cy="navbar-login-logout-button" onClick={handleLoginClick}>
          {isAuth ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;

