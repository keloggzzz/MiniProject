import { useState, useContext } from "react";
import { DataContext } from "../App"; 

export default function NavBar(){
  const { logStatus, setLogStatus } = useContext(DataContext);  // Access global login state
  
  const handleLogout = () => {
    setLogStatus(false);
    sessionStorage.setItem("logged", "0"); // Update sessionStorage on logout
  };

  return(
    <div>
    <ul>
      <li><a href="/Home">Home</a></li>
       <li><a href="/Something">Something</a></li>
       <li><a href="/Something">Something</a></li>
       <li><a href="/Something">Something</a></li>
       <li><a href="/Something">Something</a></li>
       
       {logStatus?(
         <li className="pushRight">
          <button onClick={handleLogout}> Logout</button>
        </li>        
       ) : (
        <>
          <li className="pushRight"><a href="/Register">Register</a></li>
          <li className="pushRight"><a href="/Login">Login</a></li>
        </>
       )}
       
    </ul>

    </div>
  );
}