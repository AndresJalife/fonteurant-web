import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import AuthProvider from "./components/AuthProvider";
import Signup from "./pages/Signup";
import CreateRestaurant from "./pages/CreateRestaurant";
import Login from "./pages/Login";
import React from "react";

function App() {
  return (
    <div className="App" >
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/createRestaurant" element={<CreateRestaurant />} />
          </Routes>
        </AuthProvider>
    </div>
  );
}

export default App;
