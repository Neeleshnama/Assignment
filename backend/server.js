const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDatabase = require("./db/Database");
const app = express();
app.use(express.json());
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
require("./passportSetup.js");
const User_login = require("./models/User_login.js");

app.use(cors({
  origin: "http://localhost:3000", // Allow only frontend origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}))

app.use(cookieParser());

app.use(session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

const connectDB = async () => {
    try {
      await mongoose.connect("mongodb+srv://me:root123@cluster0.ujide6u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/assign", {
        serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      });
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    }
  };
  
  connectDB();
//connectDatabase();
// mongoose.connect("mongodb+srv://root:root123@cluster0.ujide6u.mongodb.net/assign", { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    instagram: String,
    youtube: String
});

const User = mongoose.model("User", userSchema);

app.post("/api/users", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});


// Get All Users
app.get("/api/users", async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  });
  
//   // Add New User
//   app.post("/api/users", async (req, res) => {
//     try {
//       const newUser = new User(req.body);
//       await newUser.save();
//       res.status(201).json(newUser);
//     } catch (error) {
//       res.status(500).json({ message: "Error adding user" });
//     }
//   });
  
  // Update User
  app.put("/api/users/:id", async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Error updating user" });
    }
  });
  
  // Delete User
  app.delete("/api/users/:id", async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user" });
    }
  });
  




// ✅ Manual Registration
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const newUser = new User({ name, email, password });
  await newUser.save();
  res.json({ message: "User registered successfully" });
});

// ✅ Manual Login (Sessions, No Token)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
  }
  req.session.user = { id: user._id, name: user.name, email: user.email };
  res.json({ message: "Login successful", user: req.session.user });
});

// ✅ Google OAuth
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", { session: true }), (req, res) => {
  req.session.user = { id: req.user._id, name: req.user.name, email: req.user.email };
  res.redirect("http://localhost:3000/dashboard");
});

// ✅ Check if user is logged in
app.get("/me", (req, res) => {
  if (req.session.user) {
      res.json({ user: req.session.user });
  } else {
      res.status(401).json({ message: "Not logged in" });
  }
});

// ✅ Logout
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.json({ message: "Logged out successfully" });
  res.redirect("http://localhost:3000/authentication/sign-in");
});
app.listen(5000, () => console.log("Server running on port 5000"));
