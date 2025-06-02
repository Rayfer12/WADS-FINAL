const mongoose = require('mongoose');


const mongoURI = 'mongodb://e2425-wads-l4bcg6:1iwiphe2@localhost:27018/e2425-wads-l4bcg6?authSource=e2425-wads-l4bcg6';

const connectDB = async () => {
  try {
  
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.log('MongoDB connection error:', err);
    process.exit(1); 
  }
};

module.exports = connectDB;
