const mongoose = require('mongoose');

const RegisterDataSchema = new mongoose.Schema({
<<<<<<< HEAD
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
=======
    name: String,
    email: String,
    password: String
>>>>>>> origin/master
}); 
  
const RegisterData = mongoose.model('RegisterData', RegisterDataSchema, 'dataAkun');
module.exports = RegisterData;