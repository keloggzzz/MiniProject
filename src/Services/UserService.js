import axios from "axios"

const host = "http://localhost:3000"; 

async function getUsers() {
    const res = await axios.get(host+"/users/users",{ headers: {
      'Content-Type': 'text/html',"Access-Control-Allow-Origin":host,
      "Access-Control-Allow-Headers": "Origin, X-Requested-With"
   }}, { withCredentials: true });
    let list=[];
    res.data.rows.map((tmp,index)=>{
        var user={
            "id":tmp.id,
            "firstName":tmp.firstName,
            "lastName":tmp.lastName,
            "userName":tmp.userName,
            "email":tmp.email, 
            "password":tmp.password,
            "role":tmp.role
            };
      list.push(user);
     })
     console.log("All users: ",list);
    return list;
}

async function getUser() {
    const res = await axios.get(host+"/users/getUser",{ headers: {
      'Content-Type': 'text/html',"Access-Control-Allow-Origin":host,
      "Access-Control-Allow-Headers": "Origin, X-Requested-With"
   }}, { withCredentials: true });
   let list=[];
   res.data.rows.map((tmp,index)=>{
       var user={
           "id":tmp.id,
           "firstName":tmp.firstName,
           "lastName":tmp.lastName,
           "userName":tmp.userName,
           "email":tmp.email, 
           "password":tmp.password,
           "role":tmp.role
           };
     list.push(user);
        })
     console.log("Single user: ",list);
     return list;
}

async function deleteUser(id) {
  try{ const res = await axios.get(host+"/users/delUser?id="+id,{ headers: {
    'Content-Type': 'text/html',"Access-Control-Allow-Origin":host,
    "Access-Control-Allow-Headers": "Origin, X-Requested-With"
 }}, { withCredentials: true });
    console.log(res.data.ans);
    return res.data.ans === "Successfully Deleted";
} catch(error){
    console.error("Error deleting user:", error);
    return false;
}}



