import mongoose from "mongoose";

const binSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true, // validate
    },
    latitude: {
        type: String,
        required: true, // validate
    },
    longitude: {
        type: String,
        required: true, // validate
    },
    landmark: {
        type: String,
        required: true, // validate
    }
});

// Export the model
const Bin = mongoose.model("Bin", binSchema);
export default Bin;
