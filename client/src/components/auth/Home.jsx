import React from "react"
import { Link } from "react-router-dom";


const Home = props => {

  return (
    <div id="root-wrapper">
      <div className="limiter">
        <div className="loginBoxContainer">
          <div className ="loginImages">
            <div className ="loginMain">
              <div className="backgroundImg">
                <img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1596503838/icons/background_kdv7df.jpg" alt="logo" />
              </div>
              <div className ="loginLogo">
                <div className="logoContainer">
                  <img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1597518193/icons/JobCannon-logo_jbm4or.png" alt="logo" />
                </div>
              </div>
            </div>
          </div>
          <div className="loginBox">
            <div className="authButtons">
              <div className="loginButton">
                <Link to="/login"> 
                  <button type="submit" className="login-btn">
                    Login
                  </button>
                </Link>
              </div>
              <div className="registerButton">
                <Link className="nav-link" to="/register">
                  <button type="submit" className="register-btn">
                    Register
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>    
  );
  };

export default Home;