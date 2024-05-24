const express = require("express");
const mongoose = require('mongoose');
const app = express();
<<<<<<< HEAD
const port = process.env.PORT || 3001;
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://HansC:VkWyDVqKl5FtDv6s@spicite.kdgxsom.mongodb.net/?retryWrites=true&w=majority&appName=Spicite";
const dbName = 'test'; //Database name
=======
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'account'; //Database name
>>>>>>> origin/master
const bcrypt = require('bcrypt'); //Hashing 
const session = require('express-session');

// MONGODB
// Connect to MongoDB
<<<<<<< HEAD
mongoose.connect(url, {
=======
mongoose.connect('mongodb://localhost:27017/account', {
>>>>>>> origin/master
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
<<<<<<< HEAD
db.on('error', (error) => console.error('MongoDB connection error:', error));
=======
db.on('error', console.error.bind(console, 'connection error:'));
>>>>>>> origin/master
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(session({
  secret: '4fT6J#p!R@h3S$9g', 
  resave: false,
  saveUninitialized: false
}));

//Authorization
const checkAuth = (req, res, next) => {
  // Periksa apakah ada sesi pengguna yang tersimpan dan nama pengguna di dalamnya
  if (req.session.user && req.session.user.name) {
    // Lanjutkan ke middleware berikutnya jika pengguna telah login
    next();
  } else {
    // Jika tidak, kirim respons "Unauthorized"
    res.redirect('/Login');
  }
};

//SIGNUP
const RegisterData = require('./Model/SignupModel.js');

app.post('/submit-register', async (req, res) => {
  try {
      const { name, email, password } = req.body;
<<<<<<< HEAD
      
      // Check if user already exists
      const existingUser = await RegisterData.findOne({ name });
      if (existingUser) {
          return res.status(400).send('User already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the cost factor

      // Create a new document in MongoDB for Register data with hashed password
      const registerData = new RegisterData({ name, email, password: hashedPassword });
      await registerData.save();

      console.log('User registered:', registerData);

      res.redirect('/Login'); // Redirect user to login page after successful registration
  } catch (err) {
      console.error('Error during registration:', err);
=======
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10); // 10 adalah cost factor
      // Create a new document in MongoDB for Register data with hashed password
      const registerData = new RegisterData({ name, email, password: hashedPassword });
      await registerData.save();
      res.redirect('/Login'); // Arahkan pengguna ke halaman login setelah pendaftaran berhasil
  } catch (err) {
      console.error(err);
>>>>>>> origin/master
      res.status(500).send('Internal Server Error');
  }
});

//LOGIN
let isLoggedIn = false;

<<<<<<< HEAD
app.post('/login', async (req, res) => {
  let client;
  try {
      const { name, password } = req.body;
      client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
      const db = client.db(dbName);
      const collection = db.collection('dataAkun');
      const user = await collection.findOne({ name: name });
      if (!user) {
          return res.send('<script>alert("Invalid username or password"); window.location.href="/login";</script>');
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
=======
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
>>>>>>> origin/master
      if (passwordMatch) {
          isLoggedIn = true;
          req.session.user = { name: name, email: user.email };
          res.redirect('/Homepage');
      } else {
<<<<<<< HEAD
          res.send('<script>alert("Invalid username or password"); window.location.href="/login";</script>');
=======
          res.status(401).send('Invalid username or password');
>>>>>>> origin/master
      }
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send('Internal Server Error');
  } finally {
<<<<<<< HEAD
=======
      // Make sure to close the MongoDB connection when done
>>>>>>> origin/master
      if (client) {
          client.close();
      }
  }
});

// Update akun
app.put('/update-profile', checkAuth, async (req, res) => {
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
app.delete('/delete-account', checkAuth, async (req, res) => {
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
<<<<<<< HEAD
    console.error('Error deleting account:', error); 
=======
    console.error('Error deleting account:', error); // Tambahkan ini untuk mencetak kesalahan ke konsol server
>>>>>>> origin/master
    res.status(500).json({ success: false, error: "An error occurred while deleting the account" });
  }
});


//Check Login
app.get('/check-login', (req, res) => {
  res.json({ isLoggedIn });
});

// Logout
app.post('/logout', checkAuth, (req, res) => {
  res.redirect('/Homepage');
  isLoggedIn = false;
  res.json({ success: true });
});


//Comment
const Comment = require('./Model/CommentModel.js');

// Endpoint untuk menambahkan komentar baru
app.post('/add-comment', checkAuth, async (req, res) => {
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
app.get('/get-comments', checkAuth, async (req, res) => {
  try {
      const comments = await Comment.find();
      res.json(comments);
  } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).send('Internal Server Error');
  }
});

// Endpoint untuk menghapus komentar berdasarkan ID
app.delete('/delete-comment/:id', checkAuth, async (req, res) => {
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

app.put('/edit-comment/:id', checkAuth, async (req, res) => {
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

app.get('/search-comments', checkAuth, async (req, res) => {
  try {
    const { searchText } = req.query;
    const comments = await Comment.find({ comment: { $regex: searchText, $options: 'i' } });
    res.json(comments);
  } catch (error) {
    console.error('Error searching comments:', error);
    res.status(500).send('Internal Server Error');
  }
});

// INSIGHT
const Insight = require('./Model/InsightModel.js');

app.post('/submit-form', checkAuth, async (req, res) => {
  try {
    // Pastikan ada sesi pengguna yang login
    if (!req.session.user || !req.session.user.name) {
      return res.status(401).send('Unauthorized'); // Tidak ada pengguna yang terautentikasi
    }
    
    const { criticism, suggestions } = req.body;
    const username = req.session.user.name; // Ambil nama pengguna dari sesi

<<<<<<< HEAD
=======
    // Buat instance model MongoDB menggunakan data yang diterima dan nama pengguna dari sesi
>>>>>>> origin/master
    const newInsight = new Insight({
      name: username,
      criticism: criticism,
      suggestions: suggestions
    });

    // Simpan instance model ke basis data MongoDB
    await newInsight.save();

    // Beri respons bahwa data berhasil disimpan
    res.status(201).send('Form data saved successfully');
  } catch (error) {
    // Tangani kesalahan jika terjadi
    console.error('Error saving form data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint untuk mengambil riwayat Insight berdasarkan nama pengguna
app.get('/insight-history', checkAuth, async (req, res) => {
  try {
    const username = req.session.user.name; // Ambil nama pengguna dari sesi

    // Temukan semua Insight yang sesuai dengan nama pengguna dari koleksi 'insightUser' di dalam database 'account'
    // Diurutkan berdasarkan timestamp secara descending
    const insightHistory = await Insight.find({ name: username }).sort({ timestamp: -1 });

    // Kirim riwayat Insight yang diurutkan sebagai respons
    res.json(insightHistory);
  } catch (error) {
    console.error('Error fetching insight history:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/delete-insight/:id', checkAuth, async (req, res) => {
  try {
      const id = req.params.id;
      // Hapus insight dari basis data MongoDB berdasarkan ID
      const deletedInsight = await Insight.findByIdAndDelete(id);

      if (deletedInsight) {
          res.status(200).send('Insight deleted successfully');
      } else {
          res.status(404).send('Insight not found');
      }
  } catch (error) {
      console.error('Error deleting insight:', error);
      res.status(500).send('Internal Server Error');
  }
});

app.put('/update-insight/:id', checkAuth, async (req, res) => {
  try {
      const id = req.params.id;
      const { criticism, suggestions } = req.body;

      // Temukan dan perbarui Insight berdasarkan ID
      const updatedInsight = await Insight.findByIdAndUpdate(id, {
          criticism,
          suggestions,
          timestamp: new Date() // Update timestamp ke waktu sekarang
      }, { new: true });

      if (updatedInsight) {
          res.status(200).send('Insight updated successfully');
      } else {
          res.status(404).send('Insight not found');
      }
  } catch (error) {
      console.error('Error updating insight:', error);
      res.status(500).send('Internal Server Error');
  }
});


// REVIEW
const Review = require('./Model/ReviewModel.js');

// Endpoint untuk menambahkan review baru ke dalam database
app.post('/submit-review', checkAuth, async (req, res) => {
  try {
      const { foodName, rating, reviewText } = req.body;
      const username = req.session.user.name; // Ambil nama pengguna dari sesi

      // Membuat instance model Review baru
      const newReview = new Review({
          username: username,
          foodName: foodName,
          rating: rating,
          reviewText: reviewText
      });

      // Menyimpan review ke dalam database
      await newReview.save();

      res.status(201).send('Review added successfully');
  } catch (error) {
      console.error('Error adding review:', error);
      res.status(500).send('Failed to add review');
  }
});

// ENDPOINTS
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
app.get('/InsightHistory', checkAuth, (req, res) => {
  res.render('InsightHistory', { title: 'Insight History' });
});
app.get('/Cart', (req, res) => {
  res.render('Cart', { title: 'Insight' });
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
