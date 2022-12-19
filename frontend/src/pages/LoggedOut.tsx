import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/mcgill-logo.png";
import "../style/login.css";

const LoggedOut: React.FC = () => {
  return (
    <div className="login">
    <div className="welcome">
      <form>
        <div className="form-inner">
          <img className="logo" src={logo} alt="mcgill-logo" />
          <h1 style={{ marginTop: "40px", marginBottom: "5px" }}>Sign out</h1>
          <h4>You have successfully signed out.</h4>
          <p className="bottom">
            <Link className="links" to="/login">
              Return to Login
            </Link>
          </p>
        </div>
      </form>
    </div>
    </div>
  );
};

export default LoggedOut;
