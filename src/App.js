import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import AuthProvider from "./components/AuthProvider";
import Signup from "./pages/Signup";
import CreateRestaurant from "./pages/CreateRestaurant";
import Login from "./pages/Login";
import Restaurant from "./pages/Restaurant";
import Restaurants from "./pages/Restaurants";
import Home2 from "./pages/Home2";

function App() {
    return (
        <div>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/home2" element={<Home2/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Signup/>}/>
                    <Route path="/createRestaurant" element={<CreateRestaurant/>}/>
                    <Route path="/restaurants" element={<Restaurants/>}/>
                    <Route path="/restaurant/:id" element={<Restaurant/>}/>
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
