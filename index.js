const express = require("express");
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const path = require("path");
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'account';
const bcrypt = require('bcrypt');
const session = require('express-session');

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

// Session
app.use(session({
  secret: '4fT6J#p!R@h3S$9g', // Ganti dengan kunci rahasia yang kuat
  resave: false,
  saveUninitialized: false
}));

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
}, { collection: 'dataAkun' }); 

const RegisterData = mongoose.model('RegisterData', RegisterDataSchema);

app.post('/submit-register', async (req, res) => {
  try {
      const { name, email, password } = req.body;
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10); // 10 adalah cost factor
      // Create a new document in MongoDB for Register data with hashed password
      const registerData = new RegisterData({ name, email, password: hashedPassword });
      await registerData.save();
      res.redirect('/Login'); // Arahkan pengguna ke halaman login setelah pendaftaran berhasil
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
});

//LOGIN
let isLoggedIn = false;

app.post('/Homepage', async (req, res) => {
  let client;

  try {
      // Extract username and password from the request
      const { name, password } = req.body;

      // Connect to MongoDB
      client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
      
      // Access the 'dataAkun' collection in the 'account' database
      const db = client.db(dbName);
      const collection = db.collection('dataAkun');

      // Find the user based on the provided username
      const user = await collection.findOne({ name: name });

      // If the user is not found
      if (!user) {
          return res.status(401).send('Invalid username or password');
      }

      // Compare the provided password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      // If the passwords match, login is successful
      if (passwordMatch) {
          isLoggedIn = true;
          req.session.user = { name: name, email: user.email };
          res.redirect('/Homepage');
      } else {
          res.status(401).send('Invalid username or password');
      }
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

// Update akun
app.put('/update-profile', async (req, res) => {
  try {
      const { newName, newEmail } = req.body;
      const { name, email } = req.session.user; // Retrieve name and email from session

      // Update profile in MongoDB
      const updatedAccount = await RegisterData.findOneAndUpdate({ name: name, email: email }, { name: newName, email: newEmail }, { new: true });

      if (updatedAccount) {
          req.session.user = { name: newName, email: newEmail };
          req.session.destroy();
          res.status(200).send('Profile updated successfully');
      } else {
          res.status(404).send('User not found');
      }
  } catch (err) {
      console.error(err);
      res.status(500).send('Failed to update profile');
  }
});


// Delete akun
app.delete('/delete-account', async (req, res) => {
  try {
    // Dapatkan nama pengguna dan email dari sesi atau permintaan
    const { name, email } = req.session.user;
    // Hapus akun dari basis data MongoDB berdasarkan nama pengguna (name) dan alamat email (email)
    const deletedUser = await RegisterData.findOneAndDelete({ name: name, email: email });

    // Hapus juga sesi pengguna
    req.session.destroy();

    if (deletedUser) {
      res.redirect('/');
    } else {
      res.status(404).json({ success: false, error: "User not found" });
    }
  } catch (error) {
    console.error('Error deleting account:', error); // Tambahkan ini untuk mencetak kesalahan ke konsol server
    res.status(500).json({ success: false, error: "An error occurred while deleting the account" });
  }
});


//Check Login
app.get('/check-login', (req, res) => {
  res.json({ isLoggedIn });
});

// Logout
app.post('/logout', (req, res) => {
  res.redirect('/Homepage');
  isLoggedIn = false;
  res.json({ success: true });
});


//Comment
const commentSchema = new mongoose.Schema({
  username: String,
  comment: String
});

// Model komentar
const Comment = mongoose.model('Comment', commentSchema, 'dataComment');

// Endpoint untuk menambahkan komentar baru
app.post('/add-comment', async (req, res) => {
  try {
      const { username, comment } = req.body;
      const newComment = new Comment({ username, comment });
      await newComment.save();
      res.status(201).send('Comment added successfully');
  } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).send('Internal Server Error');
  }
});

// Endpoint untuk mengambil semua komentar
app.get('/get-comments', async (req, res) => {
  try {
      const comments = await Comment.find();
      res.json(comments);
  } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).send('Internal Server Error');
  }
});

// Endpoint untuk menghapus komentar berdasarkan ID
app.delete('/delete-comment/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const deletedComment = await Comment.findByIdAndDelete(id);
      if (deletedComment) {
          res.status(200).send('Comment deleted successfully');
      } else {
          res.status(404).send('Comment not found');
      }
  } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).send('Internal Server Error');
  }
});

app.put('/edit-comment/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { comment } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(id, { comment }, { new: true });
    if (updatedComment) {
      res.status(200).send('Comment updated successfully');
    } else {
      res.status(404).send('Comment not found');
    }
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/search-comments', async (req, res) => {
  try {
    const { searchText } = req.query;
    const comments = await Comment.find({ comment: { $regex: searchText, $options: 'i' } });
    res.json(comments);
  } catch (error) {
    console.error('Error searching comments:', error);
    res.status(500).send('Internal Server Error');
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

app.get('/Dashboard', (req, res) => {
  // Periksa apakah ada sesi pengguna yang login
  if (!req.session.user) {
    return res.redirect('/Login'); // Redirect ke halaman login jika tidak ada sesi pengguna
  }

  // Dapatkan informasi pengguna dari sesi
  const { name, email } = req.session.user;

  // Render dashboard dengan informasi pengguna
  res.render('Dashboard', { title: 'Dashboard', name, email });
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
  res.render('Login', { title: 'Login' });
});


//static
app.use(express.static("public"));


app.set("view engine", "ejs");

// LISTENING PORT
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
