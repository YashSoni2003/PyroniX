const express = require('express');

const App = express();
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
App.use(cors());
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use("/api/auth", authRoute);
App.use("/api/form", contactRoute);

App.get('/', (req, res) => {
    res.json({ online: "auth" });
});

App.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
