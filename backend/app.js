const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 36971;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const customerRoutes = require("./routes/customer");
app.use("/api/customers", customerRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to Customers API!");
});

// Connect to MongoDB and start server
async function main() {
  try {
    mongoose.set("strictQuery", true);

    const connectionString = process.env.MONGO_URI; // ✅ Use env variable
    await mongoose.connect(connectionString);

    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log("🚀 Server is listening at port:", PORT);
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}

main();

module.exports = app;


