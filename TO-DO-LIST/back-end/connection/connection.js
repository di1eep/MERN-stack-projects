const mongoose = require("mongoose");

const connect = async(req, res) => {
  await mongoose.connect("mongodb+srv://pd9505424580:2pOoySPF9yTWac3B@cluster0.uvnlyys.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("connected");
  })
};
connect();