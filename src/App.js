import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import {PublicRoute} from "./components/Router/PublicRoute";
import {PrivateRoute} from "./components/Router/PrivateRoute";
import Home from "./pages/Home";
import AuthProvider from "./components/AuthProvider";
import CreateRestaurant from "./pages/CreateRestaurant";
import Restaurant from "./pages/Restaurant";
import Restaurants from "./pages/Restaurants";
import Profile from "./pages/Profile";
import MyRestaurant from "./pages/MyRestaurant";

function App() {
    return (
        <div>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<PublicRoute Component={Home}/>}/>
                    <Route path="/create-restaurant" element={<PrivateRoute Component={CreateRestaurant}/>}/>
                    <Route path="/restaurants" element={<PrivateRoute Component={Restaurants}/>}/>
                    <Route path="/restaurant/:id" element={<PrivateRoute Component={Restaurant}/>}/>
                    <Route path="/profile" element={<PrivateRoute Component={Profile}/>}/>
                    <Route path="/my-restaurant" element={<PrivateRoute Component={MyRestaurant}/>}/>
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
