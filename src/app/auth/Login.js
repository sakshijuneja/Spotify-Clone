import React, { useContext, useState } from "react";
import "../../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../routes/MyRoutes";

function Login() {
    // console.log(theme, "THEMEEE")
const theme = useContext(ThemeContext);
console.log(theme,"ertyuix")

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Incomplete details!");
            return;
        }

        const userDetails = JSON.parse(localStorage.getItem('userDetailsSpotify')) || []; // Use the correct key
        const user = userDetails.find(user => user.Email === email && user.Password === password);
        console.log(user);
        
        if (user) {
            alert("Login successful!");
            // navigate("layout");
            let token =  Math.random().toString(36).substr(2); 
            localStorage.setItem("token",JSON.stringify(token));
            
            localStorage.setItem("loggedInUser", JSON.stringify(user));

            window.location.reload();


        } else {
            setError("Invalid email or password!");
        }
    }

    return (

        <div className={`login-wrapper ${theme.isDarkTheme?"dark":"light"}-theme`}>
        <div className="login-header">
                <div className="login-header-logo"></div>
            </div>
            <div className="login-body">
                <div className="login-form-body">
                    <div className="login-form-container">
                        <h1 className="login-form-heading">Login in to Spotify</h1>

                        <form className="login-form" onSubmit={handleLogin}>
                            <label>Email</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>
                            <label>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
                            {error && <p style={{ color: "red" }}>{error}</p>}
                            <button type="submit" className="log-in-btn" style={{ marginBottom: "48px" }}>Log In</button>
                        </form>
                        <p className="do-not-have-acc">Don't have an account?<Link to="/signup"><span className="sign-up-for-spotify">Sign up for Spotify</span></Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
