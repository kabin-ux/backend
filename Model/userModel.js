import mongoose from "mongoose"; 
import bcrypt from "bcrypt";

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  NID: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true, // Assuming you're including password in the user model
  },
});


// Password Encryption
userSchema.pre('save', async function (next) {
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next()
});

// Check Password
userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
};

const User = mongoose.model("User", userSchema);
export default User;