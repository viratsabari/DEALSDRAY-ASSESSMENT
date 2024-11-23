const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { tLogin, detailModel } = require('./models/details');
const fs = require('fs');


mongoose.connect('mongodb://localhost:27017/EMPLOYEE', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once('open', () => {
    console.log('Connected to MongoDB');
  })
  .on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
app.use('/uploads', express.static(uploadDir));

app.get('/fetchdetails', async (req, res) => {
  try {
    const empDetails = await detailModel.find();
    res.json(empDetails);
  } catch (error) {
    console.error('Error fetching details:', error);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
});

app.post('/login',(req,res)=>{
  const {username,password}=req.body
  tLogin.findOne({f_userName:username,f_Pwd:password})
  .then(()=>{res.json("success")})
  .catch(()=>{res.json("invaildusername or password")})
})
app.delete('/deleteemployee/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await detailModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Failed to delete employee' });
  }
});

app.put('/updateemployee/:id', upload.single('f_Image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course } = req.body;

    const updatedData = {
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_Gender,
      f_Course: f_Course,
    };

    if (req.file) {
      updatedData.f_Image = req.file.filename;
    }

    await detailModel.findByIdAndUpdate(id, updatedData, { new: true }); 
    res.status(200).json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Failed to update employee' });
  }
});
app.get('/fetchdetailspersonal/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const detail = await detailModel.findById(id);
      if (!detail) {
          return res.status(404).json({ message: 'Employee not found' });
      }
      res.json(detail);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching employee details' });
  }
});
app.post('/storedetails', upload.single('f_Image'), async (req, res) => {
  try {
    const { f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course } = req.body;
    const newEmployee = new detailModel({
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_Gender,
      f_Course: Array.isArray(f_Course) ? f_Course.join(', ') : f_Course,
      f_Image: req.file?.filename || null,
      f_Createdate: new Date(),
    });

    await newEmployee.save();
    res.status(200).json({ message: 'Data and file added successfully' });
  } catch (error) {
    console.error('Error storing details:', error);
    res.status(500).json({ message: 'Failed to store details' });
  }
});


const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));