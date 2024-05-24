const mongoose = require('mongoose');

const RegisterDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}); 
  
const RegisterData = mongoose.model('RegisterData', RegisterDataSchema, 'dataAkun');
module.exports = RegisterData;