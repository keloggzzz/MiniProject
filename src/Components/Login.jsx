import {useState, useContext} from "react";
import { DataContext } from "../App";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons'

export default function Login(){
const [uname,setUname]=useState("");
const [pwd, setPwd]=useState("");
const[loginSt,setLogin]=useState((sessionStorage.getItem("logged")!=null?sessionStorage.getItem("logged"):0));


function check(){
    if(uname.trim()==="" || pwd.trim() === ""){
            alert("Please fill out both fields.");

    }if(uname.trim()==="user1"  && pwd.trim() === "test"){
    sessionStorage.setItem("logged",1); //shared in session rather than component. It is "global"
    setLogin(1);

    }else{
    alert("Invalid credentials");
    }
}

function logout(){
  sessionStorage.setItem("logged", 0);
  setLogin(0);
  
}

var login=<div className="loginDiv">
   <FontAwesomeIcon icon={faCircleUser} size="5x" /><br></br><br></br>
   Username:
   <input className="fields" type="text" id="uname" value={uname} placeholder="Enter username" onChange={(e)=>{setUname(e.target.value)}}/>
   <br></br><br></br>
   
   Password:
   <input className="fields" type="password" id="pwd" value={pwd} placeholder="Enter password" onChange={(e)=>{setPwd(e.target.value)}}/>
  <br></br><br></br>

  <input className="button" type="button" value="Login" onClick={check}/>
</div>


var logoutUser=<div>
You are logged in!
<br></br>
</div>
  return(

    <div>
       <div>{loginSt==0?login:logoutUser}</div>
    </div>
  );
}
