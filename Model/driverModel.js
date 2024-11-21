import mongoose from "mongoose"; 
import bcrypt from "bcrypt";

// Define the user schema
const driverSchema = new mongoose.Schema({
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
  Dlicense: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
});

// Password Encryption
driverSchema.pre('save', async function (next) {
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next()
});

// Check Password
driverSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
};

const Driver = mongoose.model("Driver", driverSchema);
export default Driver;
