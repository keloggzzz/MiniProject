import { useState, useContext } from "react";
import { DataContext } from "../App"; 

export default function NavBar(){
  const{logStatus,setLogStatus} = useContext(DataContext);
  
  const updateLogout = () => {
    sessionStorage.setItem("logged", "0"); // Update sessionStorage on logout
    setLogStatus(0);
  };

  var loggedIn=<div>
      <button className="block px-5 py-1 bg-pink-500 text-black rounded" onClick={updateLogout}>Logout</button>
    </div>

  var loggedOut=<div className="grid grid-cols-2 border-3">
      <div><a href="/Login">Login</a></div>
      <div><a href="/Register">Register</a></div>
  </div>
  

  return(
      <div className='grid grid-cols-8 bg-pink-200 px-10 py-3 border-3 border-pink-500 items-center'>
        <div><a href="/Home">Home</a></div>
        <div><a href="/About">About</a></div>
     
        <div><a href="/Placeholder">Placeholder</a></div>
        <div><a href="/Placeholder">Placeholder</a></div>
        <div></div>
        <div></div>
        <div></div>
        
        <div>{Number(logStatus)===1?loggedIn:loggedOut}</div>
    </div>
  );
}