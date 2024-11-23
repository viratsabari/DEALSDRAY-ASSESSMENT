import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Login from "./Components/Login";
import Adminpanel from "./Components/Adminpanel";

const App = () => {
   return (
      <div className="app">
         <BrowserRouter>
            <Link className="border-2 border-black inline-block p-2 w-[100%]" to="/">Logo</Link>
            <Routes>
               <Route path="/" element={<Login />} />
               <Route path="/Adminpanel/*" element={<Adminpanel/>} />
             
               
</Routes>
         </BrowserRouter>
      </div>
   );
};

export default App;
