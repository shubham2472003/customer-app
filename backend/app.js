const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 36971;

// enable cors
app.use(cors());
// enable json parser
app.use(express.json());

// route the customer api
const customerRoutes = require("./routes/customer"); // ✅ make sure file matches
app.use("/api/customers", customerRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Customers API !");
});

// MongoDB connection
async function main() {
  try {
    mongoose.set("strictQuery", true);

    // ✅ Use correct connection string
    const connectionString =
      "mongodb+srv://shubhamrawat2472003:R0VmFPGp7Ph0uw8Y@cluster0.7yussm6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
