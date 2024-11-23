const mongoose = require('mongoose');


const tLoginSchema = new mongoose.Schema({
  f_sno: Number,
  f_userName: { type: String, required: true },
  f_Pwd: { type: String, required: true },
});

const detailSchema = new mongoose.Schema({
  f_Name: { type: String, required: true },
  f_Email: { type: String, required: true },
  f_Mobile: { type: String, required: true },
  f_Designation: { type: String, required: true },
  f_Gender: { type: String, required: true },
  f_Course: { type: String, required: true },
  f_Image: { type: String, required: false },
  f_Createdate: { type: Date, default: Date.now },
});

const tLogin = mongoose.model('t_login', tLoginSchema);
const detailModel = mongoose.model('t_employees', detailSchema);

module.exports = { tLogin, detailModel };
