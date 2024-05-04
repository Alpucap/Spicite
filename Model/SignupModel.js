const mongoose = require('mongoose');

const RegisterDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
}); 
  
const RegisterData = mongoose.model('RegisterData', RegisterDataSchema, 'dataAkun');
module.exports = RegisterData;