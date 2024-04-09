const express = require("express");
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const path = require("path");

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/account', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// Memasukkan data insight
const FormDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
}, { collection: 'insightUser' }); // Specify collection name


// Create a model
const FormData = mongoose.model('FormData', FormDataSchema);

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/submit-form', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        // Create a new document in MongoDB
        const formData = new FormData({ name, email, message });
        await formData.save();
        res.status(201).send('Form data saved successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Memasukkan data register
const RegisterDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
}, { collection: 'dataAkun' }); // Specify collection name

// Create a model for Register data
const RegisterData = mongoose.model('RegisterData', RegisterDataSchema);

// Route to handle register form submission
app.post('/submit-register', async (req, res) => {
  try {
      const { name, email, password } = req.body;
      // Create a new document in MongoDB for Register data
      const registerData = new RegisterData({ name, email, password });
      await registerData.save();
      res.status(201).send('Register data saved successfully');
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
});

// Menampilkan halaman pendaftaran
app.get('/Signup', (req, res) => {
  res.render('Signup', { title: 'Signup' });
});

// Render homepage
app.get('/', (req, res) => {
  res.render('Homepage', { title: 'Home' });
});

app.get('/Homepage', (req, res) => {
  res.render('Homepage', { title: 'Home' });
});

app.get('/Recipe', (req, res) => {
  res.render('Recipe', { title: 'Recipe' });
});

app.get('/Shop', (req, res) => {
  res.render('Shop', { title: 'Shop' });
});

app.get('/Insight', (req, res) => {
  res.render('Insight', { title: 'Insight' });
});

//Menu Recipe
app.get('/Recipe_1', (req, res) => {
  res.render('Recipe_1', { title: 'Menu Recipe' });
});

//static
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
