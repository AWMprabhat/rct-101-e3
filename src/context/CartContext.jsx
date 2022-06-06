
import axios from "axios";
import React, { createContext, useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  const getCartItemByProductId = (productId) =>
    cartItems.find((item) => item.productId === productId) || {};

  const getCartItemCountByProductId = (productId) => {
    let item = cartItems.find((item) => item.productId === productId) || {};
    return item.count || 0;
  };

  const addItemToCart = async (cartInfo) => {
    return axios
      .post("http://localhost:8080/cartItems", { ...cartInfo })
      .then(({ data }) => {
        setCartItems([...cartItems, data]);
      });
  };

  const removeItemFromCart = async (productId) => {
    let item = getCartItemByProductId(productId);
    if (item.id) {
      return axios
        .delete(`http://localhost:8080/cartItems/${item.id}`)
        .then(() => {
          let updatedCartItems = cartItems.filter((cI) => cI.id !== item.id);
          setCartItems(updatedCartItems);
        });
    }
  };

  const updateItemCount = async (productId, newCount) => {
    if (newCount === 0) {
      return removeItemFromCart(productId);
    } else {
      let item = cartItems.find((item) => item.productId === productId) || {};
      if (item.id) {
        return axios
          .patch(`http://localhost:8080/cartItems/${item.id}`, {
            count: newCount,
          })
          .then(({ data }) => {
            let updatedCartItems = cartItems.map((cI) => {
              if (cI.id === item.id) {
                return data;
              } else {
                return cI;
              }
            });
            setCartItems(updatedCartItems);
          });
      }
    }
  };

  useEffect(() => {
    if (isAuth) {
      axios.get("http://localhost:8080/cartItems").then(({ data }) => {
        setCartItems(data);
      });
    }
  }, [isAuth]);
  return (
    <CartContext.Provider
      value={{
        cartItemsCount: cartItems.length,
        cartItems,
        getCartItemCountByProductId,
        addItemToCart,
        removeItemFromCart,
        updateItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
