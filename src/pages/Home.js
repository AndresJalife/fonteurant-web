import Toolbar from "../components/Toolbar";
import Signup from "./Signup";
import {useState} from "react";
import Login from "./Login";
import LayoutDefault from "../components/LayoutDefault";
import {useAuth} from "../components/AuthProvider";

const Home = () => {
  const auth = useAuth();

  return (
    <LayoutDefault>
      <h1>Home!</h1>
    </LayoutDefault>
  )
}

export default Home
