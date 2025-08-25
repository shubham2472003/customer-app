const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");

// GET: list
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    console.error("GET /customers error:", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

// GET: get by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error("GET /customers/:id error:", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

// POST: create
router.post("/", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    const savedCustomer = await customer.save(); // ✅ now awaited
    res.status(201).json(savedCustomer);
  } catch (error) {
    console.error("POST /customers error:", error);
    res
      .status(400)
      .json({ message: "Error creating customer", error: error.message });
  }
});

// PUT: update
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error("PUT /customers/:id error:", error);
    res
      .status(400)
      .json({ message: "Error updating customer", error: error.message });
  }
});

// DELETE: delete
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("DELETE /customers/:id error:", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Check if already exists
    const existing = await Customer.findOne({ $or: [{ email }, { phone }] });

    if (existing) {
      return res.status(400).json({ message: "Customer already exists!" });
    }

    // If not found, save new
    const customer = new Customer({ name, email, phone });
    await customer.save();

    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
