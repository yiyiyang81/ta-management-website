import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/mcgill-logo.png";
import socsLogo from "../assets/images/socs-logo.png";
import { UserContext } from "../App";
import "../App.css";
import "../style/login.css";
import Button from "../common/Button";

const Login: React.FC = () => {
  // Load global state
  const { user, setUser } = useContext(UserContext);

  // Declare hooks
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // on submit pass email and password values entered by user
  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // error if empty email or password
    if (!email || !password) {
      // error if user does not enter username and/or password
      console.error("Please provide your username and password.");
      setError("Please provide your username and password.");
      return;
    }

    try {
      // Make login API call
      // CAUTION: Do not hardcode the URLs, instead use routers
      const res = await fetch("http://127.0.0.1:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      // If login was successful, set user and redirect to home page
      if (res.status === 200) {
        const result = await res.json();
        // set user state
        setUser(result);
        navigate("/dashboard");
        return;
      } else {
        // error unable to login, invalid username or password
        setError("Invalid username or password.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="landing-container">
      <div className="login-container">
        <div className="login">
          <div>
            <img className="logo" src={socsLogo} alt="socs-logo" />
          </div>
          <div>
            <img className="logo" src={logo} alt="mcgill-logo" />
          </div>
          <form onSubmit={submitHandler}>
            <div className="form-inner">
              <p className="top">Sign in with your email and password.</p>
              
              {error !== "" ? <div className="error"> * {error} </div> : ""}

              <div className="login-form-group mb-2">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="login-form-group mb-2">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" value="Log In"></Button>
            </div>
          </form>
        </div>
      </div>
      <div className="registration-container">
        <div className="registration">
          <div className="mb-5">
            <h1 className="mb-4">Welcome to myTAs! </h1>
            The teaching assistant management website designed to enhance your
            learning experience. <br />
            As a student and a teacher, you’ll be able to learn more about your
            TAs. <br />
            As a teaching assistant, you’ll be able to get instant feedback and
            connect with your students
          </div>

          <Link to="/register">
            <div className="register-button">
            <Button type="primary" value="Register"></Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
