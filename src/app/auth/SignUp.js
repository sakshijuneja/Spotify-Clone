import React,{useContext} from "react";
import "../../styles/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { Token } from "@mui/icons-material";
import { ThemeContext } from "../../routes/MyRoutes";

function SignUp() {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  
  // let userDetailsSpotify = [];
  let userDetailsSpotify =
    JSON.parse(localStorage.getItem("userDetailsSpotify")) || [];

  const handleSignup = (e) => {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
   

    const namePattern = /^[a-zA-Z\s]*$/; // Allow only alphabets and spaces
    const passwordPattern = /^(?=.*[!@#$%^&*()])(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
    const emailPattern = /\S+@\S+\.\S+/;

    //  VALIDATIONS START //////////////////////////////
    //All fields require
    if (!name || !email || !password || !confirmPassword) {
      alert("Incomplete details!");
      return;
    }

    // Name validation
    if (!name.match(namePattern)) {
      alert("Name should contain only alphabets and spaces");
      return;
    }

    //Email validation
    if (!emailPattern.test(email)) {
      alert("Invalid email format");
      return;
    }

    //Password validation
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    } else if (!password.match(passwordPattern)) {
      let message = "Password must contain:";
      if (!/(?=.*[A-Z])/.test(password)) {
        message += "\n- at least one uppercase letter";
      }
      if (!/(?=.*[0-9])/.test(password)) {
        message += "\n- at least one number";
      }
      if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) {
        message += "\n- at least one special character";
      }
      alert(message);
      return;
    }

    //Match Password
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    //  VALIDATIONS END //////////////////////////////

    let eachUserDetails = {
      Name: name,
      Email: email,
      Password: password,
      // ConfirmPassword : confirmPassword,
      Playlists: [], // Initialize an empty array to store playlist names

      
    };

    alert("Signup Success!")
    userDetailsSpotify.push(eachUserDetails);

    navigate("/");
    console.log(userDetailsSpotify);

    //Local Storage
    localStorage.setItem("userDetailsSpotify",JSON.stringify(userDetailsSpotify));
  };

  return (
    <div className={`login-wrapper ${theme.isDarkTheme?"dark":"light"}-theme`}>
      <div className="login-header">
        <div className="login-header-logo"></div>
      </div>
      <div className="login-body">
        <div className="login-form-body">
          <div className="login-form-container">
            <h1 className="login-form-heading" style={{ textAlign: "left" }}>
              Sign up to start listening
            </h1>

            <form className="login-form" onSubmit={handleSignup}>
              <label>Name </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
              ></input>

              <label>Email</label>
              <input
                type="text"
                id="email"
                placeholder="name@domain.com"
              ></input>

              <label>Password</label>
              <input
                type="password"
                id="password"
                placeholder="Create Password"
              ></input>

              <label>Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm Password"
              ></input>

              {/* SHOWW PASSWORD */}

              {/* <div className="show-password" style={{display: "flex"}}>
              <input type="checkbox" onclick="myFunction()"/>Show Password
              </div> */}

              <button
                type=""
                className="log-in-btn"
                style={{ marginBottom: "48px" }}
              >
                Submit
              </button>
            </form>
            <p className="do-not-have-acc">
              Already have an account?
              <Link to="/">
                <span className="sign-up-for-spotify">Log in here.</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
