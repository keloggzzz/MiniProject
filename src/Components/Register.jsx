import { useState, useContext } from "react";
import { DataContext } from "../App"; 
import { addUser, loginUser } from "../Services/UserService";

export default function Register() {
{/************************************************USE STATES***************************************************/}
    const{logStatus,setLogStatus} = useContext(DataContext);  // Access global login state

    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("Select city");
    const [zip, setZip] = useState("");
    const [uName, setuName] = useState("");
    const [pwd, setPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [adminCode, setAdminCode] = useState("");

    const [isRegistered, setIsRegistered] = useState(false); //Display reg page

   

{/*****************************************INPUT VALIDATION********************************/}
    function validate(){
        // FName and lName must ust not contain numbers
        let nameRegex = /^[A-Za-z]+$/;
        if (!nameRegex.test(fName)) {
                alert("First Name must not contain numbers.");
                return false;
        }
        if (!nameRegex.test(lName)) {
                alert("Last Name must not contain numbers.");
                return false;
        }

        // ID validation
        if (isNaN(id) || id === "") {
            alert("ID must be numeric.");
            return false;
        }

        // Email must be in form zzzz@zzzz.com
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Email must contain both @ and . symbols.");
                return false;
        }

        // Zip validation
        if (isNaN(zip) || zip === "") {
                alert("Zip Code must be numeric.");
                return false;
        }

        // Username must not contain spaces and should not start with a number or special character
        const userNameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
                if (!userNameRegex.test(uName)) {
                alert("Username must not contain spaces and cannot start with a number or special character.");
                return false;
        }

        // Password validation. Allowing special characters 
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@#$%^&*!]{10,}$/;
                if (!passwordRegex.test(pwd)) {
                alert("Password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.");
        return false;
        }

        //Confirm password, must match password
        if (pwd !== confirmPwd) {
            alert("Passwords do not match.");
        return false;
        }

        // Check that all fields are filled
    if (!fName || !lName || !id || !email || !city || !zip || !uName || !pwd || !confirmPwd) {
        alert("Please fill out all fields."); // Shows an alert if any field is empty
        return false;
    }

return true;
    }
{/************************************************SUBMIT INPUT***************************************************/}
    async function submit(){
        if (validate()) {
          const role = (adminCode === "1234" ? 1 : 0); 
          //The admin code is 1234. 
          //If the user enters this, they will be approved as admin. Otherwise, they are a regular user. 
          const user = {
            id,
            firstname: fName,
            lastname: lName,
            email: email,
            city: city,
            zipcode: zip,
            username: uName,
            password: pwd,
            role
          };
      
          const regResponse = await addUser(user);
      
          if (regResponse.success) {
            setIsRegistered(true);
            sessionStorage.setItem("logged", 1);
            setLogStatus(1);
            alert(`Registration successful!\n
              Name: ${fName} ${lName}
              Username: ${uName}
              Email: ${email}
              City: ${city}
              Zip Code: ${zip}
              Role: ${role === 1 ? "Admin" : "Normal User"}`);

            const logResponse = await loginUser(uName.trim(), pwd.trim());

            sessionStorage.setItem("logged", 1);
            setLogStatus(1);
            sessionStorage.setItem("role", logResponse.user.role)
        }
      }
    }

{/************************************************REGISTRATION SUCCESS SCREEN***************************************************/}
var regConfirmation=<div className="regDiv">
    <div>
        <h2>Registration Successful! </h2>
        <br></br>
        <p>Welcome to PixelPop, {uName}!</p>
        
    </div>
</div>
{/************************************************REGISTRATION FORM***************************************************/}
var regForm=<div className="regDiv">
    <h1>Sign Up</h1>
    <form action="" method="post">
    <div className="grid-form">
        
        <div id="col1">
            <label> First Name</label>
            <br></br>
            <input className="fields" type="text" id="fName" value={fName} placeholder="Enter your first name" onChange={(e) => setfName(e.target.value)} />
            <br></br><br></br>

            <label> Last Name</label>
            <br></br>
            <input className="fields" type="text" id="lName" value={lName} placeholder="Enter your last name" onChange={(e) => setlName(e.target.value)} />
            <br></br><br></br>

            <label> ID</label>
            <br></br>
            <input className="fields" type="text" id="id" value={id} placeholder="Enter your ID number" onChange={(e) => setId(e.target.value)} />
            <br></br><br></br>

            <label> Email</label>
            <br></br>
            <input className="fields" type="text" id="email" value={email} placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} />
            <br></br><br></br>

            <label> City</label>
            <br></br>
            <select className="fields" name="city" id="city" onChange={(e) => setCity(e.target.value)}>
                <option value=""disabled selected>Select a city</option>
                <option value="Columbia">Columbia</option>
                <option value="Greenville">Greenville</option>
                <option value="Greenwood">Greenwood</option>
                <option value="Orangeburg">Orangeburg</option>
            </select>
            <br></br><br></br>
        </div>

        <div id="col2">
            <label> Zip Code</label>
            <br></br>
            <input className="fields" type="text" id="zip" value={zip} placeholder="Enter your zip code" onChange={(e) => setZip(e.target.value)} />
            <br></br><br></br>

            <label> Username </label>
            <br></br>
            <input className="fields" type="text" id="uName" value={uName} placeholder="Enter username" onChange={(e) => setuName(e.target.value)} />
            <br></br><br></br>

            <label> Password</label>
            <br></br>
            <input className="fields" type="password" id="pwd" value={pwd} placeholder="Enter your password" onChange={(e) => setPwd(e.target.value)} />
            <br></br><br></br>

            <label> Re-enter Password</label>
            <br></br>
            <input className="fields" type="password" id="confirmPwd" placeholder="Confirm Password" onChange={(e) => setConfirmPwd(e.target.value)} />
            <br></br><br></br>

            <label> Admin Code (Optional)</label>
            <br></br>
            <input
            className="fields"
            type="password"
            id="adminCode"
            placeholder="Enter admin code if applicable"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
            />
            <br></br><br></br>
        </div>
    
    <div className="regButtonDiv">
        <input className="button" type="button" value="Cancel" />
        <input className="button" type="button" value="Sign up" onClick={submit} />
    </div>

    </div>
    </form>
</div>

{/************************************************UI DISPLAY***************************************************/}
    return(<div>{isRegistered?regConfirmation:regForm}</div>
        
    );
}