import PdfDetails from "../Model/PdfModel.js";

export const uploadFile = async (req, res) => {
  console.log("File received:", req.file); // Debugging info; remove in production
  const title = req.body.title;
  const pdf = req.file.filename;

  try {
    await PdfDetails.create({ pdf: pdf, title: title });
    console.log("File uploaded successfully");
    res.json({
      status: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "File uploaded successfully",
        File: pdf,
        Title: title,
      },
    });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).json({
      status: 500,
      IsSuccess: false,
      ErrorMessage: ["File upload failed"],
      message: "File upload failed",
    });
  }
};

export const getFile = async (req, res) => {
  try {
    const data = await PdfDetails.find({});
    res.json({
      status: 200,
      IsSuccess: true,
      ErrorMessage: [],
      message: "Files retrieved successfully",
      data: data,
    });
  } catch (err) {
    console.error("Error retrieving files:", err);
    res.status(500).json({
      status: 500,
      IsSuccess: false,
      ErrorMessage: ["Failed to retrieve files"],
      message: "Failed to retrieve files",
    });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await PdfDetails.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({
        status: 404,
        IsSuccess: false,
        ErrorMessage: ["File not found"],
        message: "File not found",
      });
    }

    res.json({
      status: 200,
      IsSuccess: true,
      ErrorMessage: [],
      message: "File deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting file:", err);
    res.status(500).json({
      status: 500,
      IsSuccess: false,
      ErrorMessage: ["Failed to delete file"],
      message: "Failed to delete file",
    });
  }
};
