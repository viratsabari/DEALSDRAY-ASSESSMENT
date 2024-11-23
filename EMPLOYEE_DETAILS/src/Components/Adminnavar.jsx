import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const Adminnavar = () => {
   let [ename,setename]=useState("")
   let navigate=useNavigate();
  useEffect(()=>{
    function setname(){
    setename(localStorage.getItem('username'))
  }
  setname();
},[])
function logout(){
  navigate('/')
  localStorage.removeItem('username')
  
}
  return (
    <div className="adminnavbar">
      <div className="bg-[rgb(222,236,246)] h-10 flex items-center border-t-0 border-2 border-black">
        <nav className="flex w-full px-36">
          <div className="flex">
            <Link className="text-black font-medium" to="/Adminpanel">Home</Link>
            <Link className="text-black font-medium ml-28" to="/Adminpanel/Employeelist">Employee List</Link></div>
          <div className="flex">
            <p className="text-black ml-[400px] cursor-pointer font-medium bg-transparent border-none outline-none">{ename} </p>
              
          
            <p className="text-black ml-28 font-medium cursor-pointer" onClick={logout}>Logout</p>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Adminnavar;
