import mongoose from "mongoose"; 
import bcrypt from "bcrypt";

// Define the inventory register schema
const AdminRegisterSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
},
{
  timestamps: true
});


// Password Encryption
AdminRegisterSchema.pre('save', async function (next) {
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next()
});

// Check Password
AdminRegisterSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
};


// Export the model
const AdminRegister = mongoose.model("AdminRegister", AdminRegisterSchema);  
export default  AdminRegister;
