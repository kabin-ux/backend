import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // validate
    },
    email: {
        type: String,
        required: true, // validate
    },
    password: {
        type: String,
        required: true, // validate
    }
});

// Export the model
const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
