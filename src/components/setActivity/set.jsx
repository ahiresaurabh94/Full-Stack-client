import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SetActivity = ()=> {

    const navigate = useNavigate()
    const [activityData , setActivityData] = useState({Activity: ""})

    async function set() {
        //if (registerData.userName && registerData.password) {
            const activity = activityData.Activity
            const token = localStorage.getItem("token")
            try{
                await fetch("https://full-stack-server1.onrender.com/lists", {
                    method: "POST",
                    headers: {"Content-Type": "application/json",
                                authorization: token},
                    body: JSON.stringify({
                        Activity : activity,
                        Status : "Pending",
                        Action : "Start"
                    })
                    
                }).then(res => {
                    navigate("/activity")
                }).catch(e => {
                    console.log("errr>>> " + e.message);
                })
            }
            catch (e) {
                alert('Some Feild Are Empty');
            }
    }

    return (
        <div>
            <input type="text" 
                   placeholder="Please Enter your Activity"
                   id="activity"
                   onChange={(e)=> setActivityData({...activityData , Activity:e.target.value})} /> <br />


            <button onClick={()=>{set()}}>Set</button>
        </div>
    )
}

export default SetActivity;