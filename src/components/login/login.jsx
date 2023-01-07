import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const [LoginData, setLoginData] = useState({userName: "", password: ""});
    const [userErr, setUserError] = useState("");
    const [passErr, setPassError] = useState('');

    async function login() {

        try {
            // const response = await fetch("https://blog-server-2zb0.onrender.com/login", {
            //await fetch("https://blog-server-2zb0.onrender.com/login", {

            await fetch("https://full-stack-server1.onrender.com/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(LoginData)
            }).then(res => {
                return res.json();
            }).then(data => {
                // console.log(data.message + "status")
                if (data.status === 400) {
                    setUserError("wrong userName!");
                } else if (data.status === 401) {
                    setUserError("")
                    setPassError("wrong password!")
                } else {
                    localStorage.setItem("name", data.userName);
                    localStorage.setItem("token", data.token);
                    navigate("/activity");
                }

            }).catch(e => {
                console.log("Error: " + e);
            })
        } 
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h2>Login</h2>

            <div>
                <input type="text"
                    placeholder="userName" 
                    onChange={(e) => setLoginData({...LoginData, userName: e.target.value})}/>
                    <div style={{color: "red"}}>{userErr}</div>
            </div>

            <div>
                <input type="password"
                    placeholder="password" 
                    onChange={(e) => setLoginData({...LoginData, password: e.target.value})}/>
                    <div style={{color: "red"}}>{passErr}</div>
            </div>

            <div>
                <button onClick={() => login()}>Login</button>
            </div>
            <div>Not have an Account click on <a href="/register" style={{"color": "green"}}>Register</a></div>
        </div>
    )
}

export default Login;
