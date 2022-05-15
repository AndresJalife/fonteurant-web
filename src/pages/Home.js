import Toolbar from "../components/Toolbar";
import Signup from "../components/Signup";
import {useState} from "react";
import Login from "../components/Login";

const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  return (
    <div className="App-header">
      <Toolbar isLoginOpen={isLoginOpen} toggleLogin={() => setIsLoginOpen(!isLoginOpen)} />

      {isLoginOpen ? <Login /> : <Signup/>}
    </div>
  )
}

export default Home
