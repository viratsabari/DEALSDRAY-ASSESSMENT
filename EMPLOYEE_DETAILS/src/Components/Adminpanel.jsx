import Adminnavar from "./Adminnavar";
import { Routes, Route } from "react-router-dom";
import Employeelist from "./Employeelist";
import Deshboard from "./Deshboard";
import Createemployee from "./Createemployee";
import Updateemployee from "./Updateemployee";

const Adminpanel = () => {
  return (
    <div className="adminpanel">
      <Adminnavar />
      <Routes>
        <Route path="/" element={<Deshboard />} />
        <Route path="/Employeelist" element={<Employeelist />} />
        <Route path="/Employeelist/Createemployee" element={<Createemployee />} />
        <Route path="/Employeelist/Updateemployee/:id" element={<Updateemployee />} />
      
      </Routes>
    </div>
  );
};

export default Adminpanel;
