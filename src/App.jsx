import './App.css';
import NavBar from './Components/NavBar';
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from './Components/Register';
import Something from './Components/Something';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState, createContext} from "react";

export const DataContext=createContext("");


export default function App() {
  const [logStatus,setLogStatus]=useState(0);
  //Making login status global 
  var login=0; 
   if(sessionStorage.getItem("logged") != null){
     login=sessionStorage.getItem("logged")
   }
 
  return (
    <>
    <DataContext.Provider value={{logStatus:logStatus, setLogStatus:setLogStatus}}>
    <h1>
    The Site
    </h1>
    <div>
    <NavBar />
    <br></br>
      </div>
    <div className='text-center text-3xl'>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Home/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Register" element={<Register/>}/>
            <Route path="/Something" element={<Something/>}/>
          </Routes>
        </BrowserRouter>
    </div>
    </DataContext.Provider>
    </>
  )
}

