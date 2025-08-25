const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now, // optional: auto-fill
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // ensures unique email
  },
  phone: {
    type: String,
    required: true,
    unique: true, // ensures unique phone
  },
});

// Export a single model
module.exports = mongoose.model("Customer", customerSchema);
