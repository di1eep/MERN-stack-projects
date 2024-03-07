const express = require("express");
const mongoose = require("mongoose");
const router = require("express").Router();
const User = require("./models/user");
const bcrypt = require("bcryptjs");

const app = express();

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pd9505424580:2pOoySPF9yTWac3B@cluster0.uvnlyys.mongodb.net/TODO_list",
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
connect();

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use(express.json()); // Middleware to parse JSON requests

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashpassword = bcrypt.hashSync(password, 10); 
    const user = new User({ email, username, password: hashpassword });
    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(400).json({ message: "User Already Exists" });
  }
});


router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
      res.status(400).json({message : "please Sign Up First"});
    }

     const isPasswordCorrect = bcrypt.compareSync(
      req.body.passsowrd,
      user.password
     );
      if(!isPasswordCorrect) {
        res.status(400).json({message: "Please Enter Correct Password"})
      }


  } catch (error) {
    res.status(400).json({message: "user already exists"});
  }
})




app.use("/api/v1", router);


app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
