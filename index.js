const express = require("express");
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const path = require("path");
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'account';

// MONGODB
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

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// INSIGHT
// Memasukkan data insight
const FormDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
}, { collection: 'insightUser' }); // Specify collection name

// Create a model
const FormData = mongoose.model('FormData', FormDataSchema);

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


//SIGNUP
const RegisterDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
}, { collection: 'dataAkun' }); // Specify collection name

const RegisterData = mongoose.model('RegisterData', RegisterDataSchema);

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

//LOGIN
app.post('/submit-login', async (req, res) => {
    let client;

    try {
        // Extract username and password from the request
        const { name, password } = req.body;

        // Connect to MongoDB
        client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        
        // Access the 'dataAkun' collection in the 'account' database
        const db = client.db(dbName);
        const collection = db.collection('dataAkun');

        // Find the user based on the provided username and password
        const user = await collection.findOne({ name: name, password: password });

        // If the user is not found or the password is incorrect
        if (!user) {
            console.log('Invalid username or password');
            return res.status(401).send('Invalid username or password');
        }

        // If the username and password match, login is successful
        console.log('Login successful');
        res.send('Login successful');
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        // Make sure to close the MongoDB connection when done
        if (client) {
            client.close();
        }
    }
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
  res.render('Recipe_1', { title: 'Rendang' });
});
app.get('/Recipe_2', (req, res) => {
  res.render('Recipe_2', { title: 'Nasi Goreng' });
});
app.get('/Recipe_3', (req, res) => {
  res.render('Recipe_3', { title: 'Pempek Palembang' });
});
app.get('/Recipe_4', (req, res) => {
  res.render('Recipe_4', { title: 'Gudeg Jogja' });
});
app.get('/Recipe_5', (req, res) => {
  res.render('Recipe_5', { title: 'Gulai Ikan Patin' });
});
app.get('/Recipe_6', (req, res) => {
  res.render('Recipe_6', { title: 'Rawon' });
});
app.get('/Recipe_7', (req, res) => {
  res.render('Recipe_7', { title: 'Pendap' });
});
app.get('/Recipe_8', (req, res) => {
  res.render('Recipe_8', { title: 'Gado-gado' });
});
app.get('/Recipe_9', (req, res) => {
  res.render('Recipe_9', { title: 'Mi Aceh' });
});
app.get('/Recipe_10', (req, res) => {
  res.render('Recipe_10', { title: 'Pempek Palembang' });
});
app.get('/Recipe_11', (req, res) => {
  res.render('Recipe_11', { title: 'Gulai Ikan Patin' });
});
app.get('/Recipe_12', (req, res) => {
  res.render('Recipe_12', { title: 'Rawon' });
});

//Signup & Login
app.get('/Signup', (req, res) => {
  res.render('Signup', { title: 'Signup' });
});
app.get('/Login', (req, res) => {
  res.render('Login', { title: 'Signup' });
});

//static
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
