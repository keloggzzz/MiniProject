import {useState, useContext, useEffect} from "react";
import { DataContext } from "../App";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons'
import { loginUser } from "../Services/UserService";

export default function Login(){
const [uname,setUname]=useState("");
const [pwd, setPwd]=useState("");
const { logStatus, setLogStatus } = useContext(DataContext); 
const [isAdmin, setIsAdmin] = useState(false);

{/************************************************USED TO CHANGE DISPLAY FOR ADMIN***************************************************/}
useEffect(() => {
  const role = sessionStorage.getItem("role");
  setIsAdmin(role === "1");
}, []);

{/************************************************CHECK LOGIN CREDS***************************************************/}
async function check() {
  if (uname.trim() === "" || pwd.trim() === "") {
    alert("Please fill out both fields.");
    return;
  }

  const response = await loginUser(uname.trim(), pwd.trim());

  if (response.success) {
    sessionStorage.setItem("logged", 1);
    setLogStatus(1);
    sessionStorage.setItem("role", response.user.role)
    sessionStorage.setItem("userId", response.user.id)
    console.log("logged in user: ", sessionStorage.getItem("userId")) //debug for order
  } else {
    alert(response.error || "Invalid credentials");
  }
}

{/************************************************LOGIN FORM***************************************************/}
var login = (
  <div className="loginDiv">
    <FontAwesomeIcon icon={faCircleUser} size="5x" />
    <br></br>
    <br></br>
    Username:
    <input
      className="fields"
      type="text"
      id="uname"
      value={uname}
      placeholder="Enter username"
      onChange={(e) => {
        setUname(e.target.value);
      }}
    />
    <br></br>
    <br></br>
    Password:
    <input
      className="fields"
      type="password"
      id="pwd"
      value={pwd}
      placeholder="Enter password"
      onChange={(e) => {
        setPwd(e.target.value);
      }}
    />
    <br></br>
    <br></br>
    <input className="button" type="button" value="Sign in" onClick={check} />
  </div>
);

{/************************************************SHOW IF LOGGED IN***************************************************/}
var logoutUser=<div>
<h2 className="text-pink-500">You are logged in!</h2>
<br></br>
</div>

{/************************************************UI DISPLAY***************************************************/}
  return(

    <div>
       <div>{logStatus==0?login:logoutUser}</div>
    </div>
  );
}
