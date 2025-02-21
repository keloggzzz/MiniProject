import { useState, useContext } from "react";
import { DataContext } from "../App"; 

export default function Register() {
    const { setLogStatus } = useContext(DataContext); 

    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("Select city");
    const [zip, setZip] = useState("");
    const [uName, setuName] = useState("");
    const [pwd, setPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");

    const [isRegistered, setIsRegistered] = useState(false); //Display reg page



    function submit(){
    if (pwd !== confirmPwd) {
        alert("Passwords do not match."); //How to validate values??
    }
    else
        setIsRegistered(true);
    }

   

    return (
        <div className="regDiv">
        {isRegistered ? (
            <div>
                <h2>Registration Successful! </h2>
                <br></br>
                <p>Welcome to the site, {fName}!</p>
                
            </div>
        
        ) : (
            <div>
            <h1>Sign Up</h1>
            <form action="" method="post">
            <div className="grid-form">
                
                <div>
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
                    <input className="fields" type="number" id="id" value={id} placeholder="Enter your ID number" onChange={(e) => setId(e.target.value)} />
                    <br></br><br></br>

                    <label> Email</label>
                    <br></br>
                    <input className="fields" type="text" id="email" value={email} placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} />
                    <br></br><br></br>

                    <label> City</label>
                    <br></br>
                    <select className="fields" name="city" id="city" onChange={(e) => setCity(e.target.value)}>
                        <option value="-1">Select a city</option>
                        <option value="1">Columbia</option>
                        <option value="2">Greenville</option>
                        <option value="3">Greenwood</option>
                        <option value="4">Orangeburg</option>
                    </select>
                    <br></br><br></br>
                </div>
                <div>
                    <label> Zip Code</label>
                    <br></br>
                    <input className="fields" type="number" id="zip" value={zip} placeholder="Enter your zip code" onChange={(e) => setZip(e.target.value)} />
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
                </div>
               
            <div className="regButtonDiv">
                <input className="button" type="button" value="Cancel" />
                <input className="button" type="button" value="Sign up" onClick={submit} />
            </div>
        
        </div>
        </form>
        </div>
        )}
    </div>
    
    );
}