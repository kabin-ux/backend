import mongoose from "mongoose";

const hazardousSchema = new mongoose.Schema({
    WasteType: {
        type: String, // dataType
        required: true, // validate
    },
    Quantity: {
        type: Number, // dataType
        required: true, // validate
    },
    DateOfCollection: {
        type: String, // dataType
        required: true, // validate
    },
    Location: {
        type: String, // dataType
        required: true, // validate
    },
    TransportMethod: {
        type: String, // dataType
        required: true, // validate
    },
    Notes: {
        type: String, // dataType
        required: true, // validate
    }
});

// Export the model
const Hazardous = mongoose.model("Hazardous", hazardousSchema); // Model name and schema
export default Hazardous;