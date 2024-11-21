import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    complaintCategory: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    attachments: {  
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

// Export the model
const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;
