import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateEmployee = () => {
  const { id } = useParams();  
  const navigate = useNavigate();

  const [empDetails, setEmpDetails] = useState(null);
  const [f_Name, setFName] = useState('');
  const [f_Email, setFEmail] = useState('');
  const [f_Mobile, setFMobile] = useState('');
  const [f_Designation, setFDesignation] = useState('');
  const [f_Gender, setFGender] = useState('');
  const [f_Course, setFCourse] = useState([]);
  const [f_Image, setFImage] = useState(null);

 
  useEffect(() => {
    async function fetchPersonal() {
      try {
        const res = await axios.get(`http://localhost:5000/fetchdetailspersonal/${id}`);
        setEmpDetails(res.data);
      } catch (err) {
        console.error('Error fetching employee details:', err);
      }
    }
    fetchPersonal();
  }, [id]);

  
  useEffect(() => {
    if (empDetails) {
      setFName(empDetails.f_Name || '');
      setFEmail(empDetails.f_Email || '');
      setFMobile(empDetails.f_Mobile || '');
      setFDesignation(empDetails.f_Designation || '');
      setFGender(empDetails.f_Gender || '');
      setFCourse(Array.isArray(empDetails.f_Course) ? empDetails.f_Course : empDetails.f_Course.split(', '));
    }
  }, [empDetails]);

  
  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFCourse([...f_Course, value]);
    } else {
      setFCourse(f_Course.filter((course) => course !== value));
    }
  };

  
  const updateEmployee = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('f_Name', f_Name);
    formData.append('f_Email', f_Email);
    formData.append('f_Mobile', f_Mobile);
    formData.append('f_Designation', f_Designation);
    formData.append('f_Gender', f_Gender);
    formData.append('f_Course', f_Course.join(', '));
    if (f_Image) {
      formData.append('f_Image', f_Image);
    }

    try {
      await axios.put(`http://localhost:5000/updateemployee/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Employee updated successfully.');
      navigate('/Adminpanel/Employeelist');
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Failed to update employee.');
    }
  };

  return (
    <div className="updateemployee">
      <p className="bg-[rgb(255,255,0)] h-8 flex items-center justify-start">Update Employee</p>
      <form className="ml-[450px] mt-8 space-y-4" onSubmit={updateEmployee}>
        <div className="flex items-center space-x-4">
          <label htmlFor="f_Name" className="w-24">Name</label>
          <input type="text" value={f_Name || ''} onChange={(e) => setFName(e.target.value)} className="border-2 rounded px-2 h-8 w-80"/>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="f_Email" className="w-24">Email</label>
          <input type="email" value={f_Email || ''} onChange={(e) => setFEmail(e.target.value)}className="border-2 rounded px-2 h-8 w-80"/>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="f_Mobile" className="w-24">Mobile</label>
          <input type="number" value={f_Mobile || ''} onChange={(e) => setFMobile(e.target.value)} className="border-2 rounded px-2 h-8 w-80"/>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="f_Designation" className="w-24">Designation</label>
          <input type="text" value={f_Designation || ''} onChange={(e) => setFDesignation(e.target.value)} className="border-2 rounded px-2 h-8 w-80" />
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="f_Gender" className="w-24">Gender</label>
          <div className="space-x-4">
            <label>
              <input type="radio" name="f_Gender" value="male" checked={f_Gender === 'male'}onChange={(e) => setFGender(e.target.value)}/> Male
            </label>
            <label>
              <input type="radio" name="f_Gender" value="female" checked={f_Gender === 'female'} onChange={(e) => setFGender(e.target.value)}/> Female
            </label>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="f_Course" className="w-24">Course</label>
          <div className="space-x-4">
            <label>
              <input type="checkbox" value="MCA" checked={f_Course.includes('MCA')} onChange={handleCourseChange}/> MCA
            </label>
            <label>
              <input type="checkbox" value="BCA" checked={f_Course.includes('BCA')} onChange={handleCourseChange}/> BCA
            </label>
            <label>
              <input type="checkbox" value="BSC" checked={f_Course.includes('BSC')} onChange={handleCourseChange}/> BSC
            </label>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="f_Image" className="w-28">Upload Image</label>
          <input type="file" onChange={(e) => setFImage(e.target.files[0])} className="px-2 h-8 w-80"/>
        </div>
        <button type="submit" className="bg-[rgb(146,208,80)] mt-8 ml-28 w-[320px] h-10 rounded text-black">Update</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
