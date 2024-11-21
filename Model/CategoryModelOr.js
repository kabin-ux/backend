import mongoose from "mongoose";

const recyclableSchema = new mongoose.Schema({
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
const Recyclable = mongoose.model("RecyclableModel", recyclableSchema); 
export default Recyclable;
