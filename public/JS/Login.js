const MongoClient = require('mongodb').MongoClient;

// Assuming you have initialized your MongoDB connection
// Replace the connection string and database name accordingly
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("Connected to MongoDB");

  const db = client.db('account'); // Replace 'your_database_name' with your actual database name
  const collection = db.collection('dataAkun'); // Replace 'dataAkun' with your actual collection name

  app.post('/Login', (req, res) => {
    const { username, password } = req.body;

    // Check MongoDB for user with provided username
    collection.findOne({ username }, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      if (!user) {
        // User not found
        return res.status(401).send('Invalid username or password');
      }

      // User found, now check if the password is correct
      if (user.password !== password) {
        // Incorrect password
        return res.status(401).send('Invalid username or password');
      }

      // Authentication successful, redirect to homepage
      res.redirect('/Homepage');
    });
  });

  // Other routes and server setup

});