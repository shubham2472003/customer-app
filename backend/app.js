const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const customerRoutes = require("./routes/customer");
app.use("/api/customers", customerRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Customers API !");
});

async function main() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}

main();


