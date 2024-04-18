import React from "react";
import { Link } from "react-router-dom";
import  work from '../components/assets/work.png'

const Home = () => {
  return (
    <div className="main-container">
      <div className="nav-container">
        <nav >
          <div className="logo-setup">
          <img src = {work} alt = 'logo'/>
          <h1>Dev-Hub</h1>
          </div>
          <div className="reg-loin-container">
          <Link to="register" style = {{textDecoration : "none"  , color : "black"}}>
            <h2 >Register</h2>
          </Link>
          <Link to="login" style = {{"textDecoration" : "none"  , color : "black"}}>
            <h2>Log In</h2>
          </Link>
          </div>
        </nav>
      </div>
      <div className="home-container">
    <div className="h-container">
    <Link to="/" style = {{textDecoration : "none"  , color : "rgb(248, 204, 7)" , fontWeight : 'bold', fontSize : "40px"}}>
          <h1>Developers Hub</h1>
        </Link>
        <p>
          Create a developer profile/portfolio , share posts and get <br/> help from
          other developers
        </p>
        <Link to="register">
          <button>Sign Up</button>
        </Link>
        <Link to="login">
          {" "}
          <button>Log In</button>{" "}
        </Link>
    </div>
      </div>
    </div>
  );
};

export default Home;
