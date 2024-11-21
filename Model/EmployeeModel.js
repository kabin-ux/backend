import mongoose from "mongoose"; // Import mongoose

// Define the employee schema
const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
  },
  employeeFirstName: {
    type: String,
    required: true,
  },
  employeeLastName: {
    type: String,
    required: true,
  },
  employeeNic: {
    type: String,
    required: true,
  },
  employeeCategory: { // Fixed the spelling from "employeeCatogory" to "employeeCategory"
    type: String,
    required: true,
  },
  employeeAddress: {
    type: String,
    required: true,
  },
  employeeEmail: {
    type: String,
    required: true,
  },
  employeePhone: {
    type: Number,
    required: true,
  },
  employeeSalary: {
    type: Number,
    required: true,
  },
});

// Export the model
const Employee =  mongoose.model("Employee", employeeSchema);
export default Employee;
