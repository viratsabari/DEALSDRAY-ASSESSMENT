import { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
   let navigate=useNavigate()


   
  const handleLogin = (e) => {
    e.preventDefault();
     axios.post('http://localhost:5000/login',{username,password})
     .then((result)=>{
       if(result.data=="success"){
   
        alert("login succssfully")
        localStorage.setItem('username', username);
      navigate('/Adminpanel')
       }else{
        alert("cant fetch data")
       }
     })
     .catch(()=>{
      alert("invaild username and password")
     })

  
  };

  return (
    <div className="login">
      <p className="bg-[rgb(255,255,0)]">Login Page</p>
      <form onSubmit={handleLogin} className="ml-60">
        <label htmlFor="username" className="m-10">UserName</label>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}className="border border-[#0e0e0e] w-80"/> <br /><br /><br /><br />
        <label htmlFor="password" className="m-11">Password</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-[#0e0e0e] w-80"
        /><br /><br /><br />
        <button type="submit" className="bg-[rgb(146,208,80)] w-80 ml-[153px]">Login</button>
      </form>
    </div>
  );
};

export default Login;
