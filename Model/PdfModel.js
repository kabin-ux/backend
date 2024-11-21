import mongoose from "mongoose"; // Import mongoose

// Define the PDF schema
const pdfSchema = new mongoose.Schema({
  pdf: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

// Export the model
const PdfDetails = mongoose.model("PdfDetails", pdfSchema);
export default PdfDetails;