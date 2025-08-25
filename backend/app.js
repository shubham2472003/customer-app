const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000; // ✅ use Render’s port

// enable cors
app.use(cors());
// enable json parser
app.use(express.json());

// route the customer api
const customerRoutes = require("./routes/customer");
app.use("/api/customers", customerRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Customers API !");
});

// MongoDB connection
async function main() {
  try {
    mongoose.set("strictQuery", true);

    // ✅ Use environment variable instead of hardcoding
    const connectionString = process.env.MONGODB_URI;

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

