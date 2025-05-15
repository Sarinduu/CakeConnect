const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

//-------------------
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});
//-------------------

// Routes
// Example: app.use('/api/users', require('./routes/userRoutes'));

// Health check route
app.get("/", (req, res) => {
  res.send("CakeConnect backend API is running");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
});

module.exports = app;
