import logo from '../img/fonteurant_logo.svg';
import Toolbar from "../components/Toolbar";

const Home = () => {
  return (
    <div>
      <Toolbar />
      <header className="App-header">
        <img src={logo} alt="logo" />
      </header>
    </div>
  )
}

export default Home
