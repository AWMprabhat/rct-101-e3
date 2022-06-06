

import React from "react";
import { Products } from "../components/Products";

const Home = () => {
  return (
    <div
      style={{
        maxWidth: "90%",
        margin: "auto",
        padding: "6px"
      }}
    >
      <Products />
    </div>
  );
};

export default Home;
