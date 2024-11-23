import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Employeelist = () => {
  const navigate = useNavigate();
  const [empDetails, setEmpDetails] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredEmpDetails, setFilteredEmpDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const result = await axios.get('http://localhost:5000/fetchdetails');
        setEmpDetails(result.data);
        setFilteredEmpDetails(result.data); // Initialize with full data
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, []);

  const navi = () => {
    navigate('/Adminpanel/Employeelist/Createemployee');
  };

  const deleteuser = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee detail?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/deleteemployee/${id}`);
        setEmpDetails((prevDetails) => prevDetails.filter((emp) => emp._id !== id));
        setFilteredEmpDetails((prevDetails) => prevDetails.filter((emp) => emp._id !== id));
        alert('User deleted successfully.');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user.');
      }
    }
  };

  const updateuser = (id) => {
    navigate(`/Adminpanel/Employeelist/Updateemployee/${id}`);
  };

  const handleSearch = () => {
    const filtered = empDetails.filter((employee) =>
      employee.f_Name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredEmpDetails(filtered);
  };

  return (
    <div className="employee-list">
      <div className="header flex w-full">
        <div className="info bg-[rgb(255,255,0)] w-1/2 h-8 border-r-2 border-black">
          <p>Employee List</p>
        </div>
        <div className="info bg-[rgb(255,255,0)] w-1/2 h-8 border-r-2 border-black"></div>
      </div>

      <div>
        <div className="creat w-full flex h-7 items-center">
          <p className="ml-[730px]">Total Count: {filteredEmpDetails.length}</p>
          <button onClick={navi} className="absolute right-[100px] w-64 bg-[rgb(168,208,141)]">
            <span className="relative right-16">Create Employee</span>
          </button>
        </div>
      </div>

      <div className="search w-full bg-[#BDD6EE] h-16">
        <button onClick={handleSearch} className="ml-[732px]">Search</button>
        <input
          type="text"
          placeholder="Enter Search Keyword"
          className="h-7 w-[460px] border-2 ml-10 border-black text-center placeholder-gray-700 placeholder-opacity-80"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>

      <table className="w-full border-collapse m-2">
        <thead>
          <tr>
            <th>Unique ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmpDetails.map((employee, index) => (
            <tr key={index}>
              <td className="border">{index + 1}</td>
              <td className="border">
                <img src={`http://localhost:5000/uploads/${employee.f_Image}`} alt="Employee" width="50" />
              </td>
              <td className="border">{employee.f_Name}</td>
              <td className="border"><a href="" className='underline text-blue-600'>{employee.f_Email}</a></td>
              <td className="border">{employee.f_Mobile}</td>
              <td className="border">{employee.f_Designation}</td>
              <td className="border">{employee.f_Gender}</td>
              <td className="border">{employee.f_Course}</td>
              <td className="border">
                {new Date(employee.f_Createdate).toLocaleDateString()}
              </td>
              <td className="border">
                <span className="cursor-pointer" onClick={() => updateuser(employee._id)}>Edit</span>{' '}-{' '}
                <span className="cursor-pointer" onClick={() => deleteuser(employee._id)}>Delete</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employeelist;