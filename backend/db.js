const mongoose = require("mongoose");

const connectToMongo = () => {
  const mongoURI =
    "mongodb://localhost:27017/"; // local databes MongoDB atlas
    mongoose.connect(mongoURI, (err) => {
      if (err) console.log("Failed to connect to database");
      else console.log("Mongo connected :)");
    });
  };
  
  module.exports = connectToMongo;

// Cloud MongoDB  

// "mongodb+srv://Vinayakchoukse1:Vinayak.1@cluster0.zbqyf.mongodb.net/?retryWrites=true&w=majority";
// mongodb+srv://arpandesai0:ad1234@cluster0.82awn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
