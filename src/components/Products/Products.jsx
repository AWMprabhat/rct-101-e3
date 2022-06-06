
import React, { useState, useEffect } from "react";
import axios from "axios";

import { Product } from "./Product";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/products").then(({ data }) => {
      setProducts(data);
    });
  }, []);
  return (
    <div>
      <h1>Products</h1>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div style={{ display: "flex", gap: "20px", margin:"auto", flexWrap: "wrap" }}>
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
