import { useContext } from "react";
import { DataContext } from "../App"; 

export default function NavBar() {
  const { logStatus, setLogStatus } = useContext(DataContext);

  const updateLogout = () => {
    sessionStorage.setItem("logged", 0);
    setLogStatus(0);
    sessionStorage.setItem("role", -1);
    setTimeout(() => window.location.reload(), 3000);
  };

  const role = Number(sessionStorage.getItem("role"));

  const loggedIn = (
    <button
      className="block px-5 py-1 bg-pink-500 text-black rounded"
      onClick={updateLogout}
    >
      Logout
    </button>
  );

  const loggedOut = (
    <div className="flex flex-row">
      <div className="border-r border-pink-500 mr-2"><a href="/Login">Login</a></div>
      <div><a href="/Register">Register</a></div>
    </div>
  );

  return (
    <div className="grid grid-cols-7 bg-pink-200 px-10 py-3 border-3 border-pink-500 items-center fixed top-12 left-0 w-full shadow-md z-10">
      <div className="border-r border-pink-500"><a href="/Home">Home</a></div>
      <div className="border-r border-pink-500"><a href="/About">About</a></div>

      {/*If user, show your order. If admin, show view order*/}
      <div>
        {role === 1 ? (
          <a href="/AdminOrder">View Orders</a>
        ) : (
          <a href="/Order">Your Order</a>
        )}
      </div>

      <div></div><div></div><div></div>
      <div>{Number(logStatus) === 1 ? loggedIn : loggedOut}</div>
    </div>
  );
}