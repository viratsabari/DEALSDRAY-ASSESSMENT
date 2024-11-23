import { useState } from "react";
import axios from "axios";

const Createemployee = () => {
  const [f_Name, setFName] = useState("");
  const [f_Email, setFEmail] = useState("");
  const [f_Mobile, setFMobile] = useState("");
  const [f_Designation, setFDesignation] = useState("");
  const [f_Gender, setFGender] = useState("");
  const [f_Course, setFCourse] = useState("");
  const [f_Image, setFImage] = useState(null);

  const handleCourseChange = (e) => {
    const value = e.target.value;
    setFCourse((prev) =>
      prev.includes(value) ? prev.filter((course) => course !== value) : [...prev, value]
    );
  };

  const storedata = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("f_Name", f_Name);
    formData.append("f_Email", f_Email);
    formData.append("f_Mobile", f_Mobile);
    formData.append("f_Designation", f_Designation);
    formData.append("f_Gender", f_Gender);
    formData.append("f_Course", f_Course);
    formData.append("f_Image", f_Image);

    axios.post("http://localhost:5000/storedetails", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        alert(response.data.message);
        setFName("");
        setFEmail("");
        setFMobile("");
        setFDesignation("");
        setFGender("");
        setFCourse("");
        setFImage(null);
      })
      .catch((error) => {
        console.error("Axios Error:", error);
        alert("Can't add data. Check server logs.");
      });
  };

  return (
    <div className="createemployee">
      <p className="bg-[rgb(255,255,0)] h-8 flex items-center justify-start">Create Employee</p>
      <form className="ml-[450px] mt-8  space-y-4" onSubmit={storedata}>
        <div className="flex items-center space-x-4">
          <label htmlFor="f_Name" className="w-24">Name</label>
          <input type="text" value={f_Name} onChange={(e) => setFName(e.target.value)} className="border-2 rounded px-2 h-8 w-80" />
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="f_Email" className="w-24">Email</label>
          <input type="email" value={f_Email} onChange={(e) => setFEmail(e.target.value)} className="border-2 rounded px-2 h-8 w-80" />
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="f_Mobile" className="w-24">Mobile</label>
          <input type="number" value={f_Mobile} onChange={(e) => setFMobile(e.target.value)} className="border-2 rounded px-2 h-8 w-80" />
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="f_Designation" className="w-24">Designation</label>
          <input type="text" value={f_Designation} onChange={(e) => setFDesignation(e.target.value)} className="border-2 rounded px-2 h-8 w-80" />
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="f_Gender" className="w-24">Gender</label>
          <div className="space-x-4">
            <label><input type="radio" name="f_Gender" value="male" checked={f_Gender === "male"} onChange={(e) => setFGender(e.target.value)} /> Male</label>
            <label><input type="radio" name="f_Gender" value="female" checked={f_Gender === "female"} onChange={(e) => setFGender(e.target.value)} /> Female</label>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-24">Courses</label>
          <div className="space-x-4">
            <label><input type="checkbox" value="MCA" checked={f_Course.includes("MCA")} onChange={handleCourseChange} /> MCA</label>
            <label><input type="checkbox" value="BCA" checked={f_Course.includes("BCA")} onChange={handleCourseChange} /> BCA</label>
            <label><input type="checkbox" value="BSC" checked={f_Course.includes("BSC")} onChange={handleCourseChange} /> BSC</label>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="f_Image" className="w-24">Image</label>
          <input type="file" onChange={(e) => setFImage(e.target.files[0])} className="w-80 h-8" />
        </div>
        <button className="bg-green-300 w-80 ml-[100px] h-10">Submit</button>
      </form>
    </div>
  );
};

export default Createemployee;
