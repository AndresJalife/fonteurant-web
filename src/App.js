import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import AuthProvider from "./components/AuthProvider";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Restaurant from "./pages/Restaurant";

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Signup/>}/>
                    <Route path="/restaurant/:id" element={<Restaurant/>}/>
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
