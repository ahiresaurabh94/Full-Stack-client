import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ()=> {
    const navigate = useNavigate();

    const [registerData , setRegisterData] = useState({userName:"" , password:"" , confirmPassword:""})
    const [error, setError] = useState("");

    async function registeration() {
        if(registerData.password !== registerData.confirmPassword) {
            return setError("password not match");
        }
        
        if (registerData.userName && registerData.password) {
            await fetch("https://full-stack-server1.onrender.com/register", {
                method: "POST",
                body: JSON.stringify(registerData),
                headers: {"Content-Type": "application/json"}
            }).then(res => {
                // console.log(res)
                navigate("/")
            }).catch(e => {
                console.log("errr>>> " + e.message);
            })
        } else {
            alert('Some Feild Are Empty');
        }
    }
    
    return (
        <div>
            <section>
            <h2>Register</h2>

            <input type="text" 
                   placeholder="userName"
                   onChange={(e)=> setRegisterData({...registerData , userName:e.target.value})} /> <br />

            <input type="password" 
                   placeholder="password"
                   onChange={(e)=> setRegisterData({...registerData , password:e.target.value})} /> <br />

            <input type="password" 
                   placeholder="confirmPassword"
                   onChange={(e)=> setRegisterData({...registerData , confirmPassword:e.target.value})} /> <br />
                   {error ? <span style={{color: "red", fontSize: "small"}}>{error}</span> : ''}
    
            <button onClick={() => registeration()}>Register</button>
            </section>
            
        </div>
    )
}

export default Register;