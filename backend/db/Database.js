const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect("mongodb+srv://me:root123@cluster0.ujide6u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/assign")
    .then((data) => {
      console.log(`mongod connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;
