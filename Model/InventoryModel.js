import mongoose from "mongoose"; // Import mongoose

// Define the inventory schema
const inventorySchema = new mongoose.Schema({
  productName: {
    type: String, // data type
    required: true, // validate
  },
  productCategory: {
    type: String,
    required: true,
  },
  materialType: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

// Export the model
const Inventory =  mongoose.model("Inventory", inventorySchema); // Exporting using ES6 syntax
export default Inventory;