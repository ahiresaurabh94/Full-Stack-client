import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";



const Activity = ()=> {

    const navigate = useNavigate()
    const [fetchedData, setFetchedData] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem("token");
        console.log(token);

        fetch('https://full-stack-server1.onrender.com/lists', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                 authorization: token,
            },
        })
            .then((response) => {
                //if (response.status === 403) return navigate("/");
                return response.json();
            })
            .then((data) => {
                setFetchedData(data.lists);
                console.log(data.lists);
            });
    }, []);

    let seconds=0;
    let minutes=0;
    let hours=0;
    let ss=document.getElementById("ss")
    let mm=document.getElementById("mm")
    let hh=document.getElementById("hh")
    // let srt=document.getElementById("start")
    // let ps=document.getElementById("pause")
    // let rst=document.getElementById("stop")
    // let cnt=document.getElementById("resume")
    var stopWatch
    
    function startTimer(){
        seconds++
     if(minutes>=60){
        hours++
        minutes%=60
     }
     if(seconds>=60){
        minutes++
        seconds%=60
     }
     if(seconds<10) ss.innerText="0"+seconds
     if(seconds<60 && seconds>=10) ss.innerText=seconds
     if(minutes<10) mm.innerText="0"+minutes
     if(minutes<60 && minutes>=10) mm.innerText=minutes
     if(hours<10) hh.innerText="0"+hours
     if(hours>=10) hh.innerText=hours
    }

    function start(){
        stopWatch=setInterval(startTimer,1000)
     }

     function pause(){
        clearInterval(stopWatch)
    }

    function reset(id){
        clearInterval(stopWatch)
        seconds=0
        const token = localStorage.getItem('token')

        const taken_time = `${hh.innerText}:${mm.innerText}:${ss.innerText}`
        console.log(typeof(taken_time));

        fetch(`https://full-stack-server1.onrender.com/lists/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                 authorization: token,
            },
            body: JSON.stringify({Time_taken:taken_time , Status: "completed"})
        })
        .then((response) => {
            if (response.status === 403 || response.status === 401) return navigate("/activity");
            window.location.reload()
            });
    }

    return (
        <div>
            <button onClick={()=>{navigate('/setActivity')}}>Add new activity</button>
            <table>
                <thead>
                    <tr>
                        <th>Activity</th>
                        <th>Status</th>
                        <th>Time taken <br /> ("Hrs:Min:Sec) </th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {fetchedData.map( data => (
                        <tr key={data._id}>
                            <td>{data.Activity}</td>
                            <td>{data.Status}</td>
                            {data.Time_taken ?  <td>{data.Time_taken}</td> : <td id="time-taken">
                                                                                        <span id="hh">00</span>
                                                                                        <span>:</span>
                                                                                        <span id="mm">00</span>
                                                                                        <span>:</span>
                                                                                        <span id="ss">00</span>
                                                                                    </td>
                            }
                                
                            <td key={data._id}>
                                <button id="start" onClick={()=> start(data._id)}>Start</button>
                                <button id="stop" onClick={()=> reset(data._id)}>End</button>
                                <button id="pause" onClick={()=> pause(data._id)}>Pause</button>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>

            
        </div>
    )
}

export default Activity;
