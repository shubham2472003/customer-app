const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
});

module.exports = mongoose.model("Customer", customerSchema);

const CustomerSchema = mongoose.Schema({
  date: {
    type: Date,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Customer = mongoose.model("customers", CustomerSchema);

module.exports = Customer;
