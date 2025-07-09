// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Define the MongoDB connection URL (local MongoDB instance with database named 'Hotels')
const mongoURL = 'mongodb://localhost:27017/Hotels';

// Connect to MongoDB using mongoose with specified options
mongoose.connect(mongoURL, {
  useNewURLParser: true,        // Use the new URL parser to avoid deprecation warnings
  useUnifiedTopology: true      // Use the new server discovery and monitoring engine
});

// Store the connection object in a variable for easier access
const db = mongoose.connection;



//define event listeners for db connection
db.on('connected',() =>{
  console.log('connected to Mongodb database');
})

db.on('error',() => {
  console.log('error connecting to database');
})

db.on('disconnected',() => {
  console.log('disconnected from database');
})


//export
module.exports = db;