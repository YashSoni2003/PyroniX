const express = require('express');

const Compiler = express();
const cors = require('cors');
const authRoute = require("./routers/auth-router");
const contactRoute = require("./routers/contact-router");
const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/";

const connectDb = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true, // Ensures correct URI parsing
      useUnifiedTopology: true, // Enables the new server discovery and monitoring engine
    });
    console.log("Connection successful to DB");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit the process with an error
  }
};
connectDb();
Compiler.use(cors());
Compiler.use(express.json());
Compiler.use(express.urlencoded({ extended: true }));
Compiler.use("/api/auth", authRoute);
Compiler.use("/api/form", contactRoute);

Compiler.get('/', (req, res) => {
    res.json({ online: "auth" });
});

Compiler.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
