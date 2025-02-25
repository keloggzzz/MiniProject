import './App.css';
import NavBar from './Components/NavBar';
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from './Components/Register';
import About from './Components/About';
import {items} from "./Model/items.json"

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState, createContext} from "react";

export const DataContext=createContext("");


export default function App() {
  //Making login status global 
  var login=0; 
   if(sessionStorage.getItem("logged") != null){
     login=sessionStorage.getItem("logged")
   }
   const [logStatus,setLogStatus]=useState(login);
   const [itemlist,setItemList]=useState(items);
 
  return (
    <>
    <DataContext.Provider value={{logStatus:logStatus, setLogStatus:setLogStatus, itemlist:itemlist, setItemList:setItemList}}>
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
            <Route path="/About" element={<About/>}/>
          </Routes>
        </BrowserRouter>
    </div>
    </DataContext.Provider>
    </>
  )
}

