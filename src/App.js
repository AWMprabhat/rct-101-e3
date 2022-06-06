


import "./App.css";
import { Route, Routes } from "react-router-dom";

import RequiredAuth from "./hoc/RequiredAuth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="App">
        // Code here
      <Navbar />
      <Routes>
        <Route path="login" element={<Login />} />

        <Route
          path=""
          element={
            <RequiredAuth>
              <Home />
            </RequiredAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
