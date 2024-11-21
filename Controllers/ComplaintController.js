import Complaint from "../Model/ComplaintModel.js";

// Get all complaints
export const getAllComplaints = async (req, res, next) => {
  try {
    const complaint = await Complaint.find();

    if (!complaint || complaint.length === 0) {
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: "No complaints found",
        Result: [],
      });
    }
    return res.status(200).json({
        StatusCode: 200,
        IsSuccess: true,
        ErrorMessage: [],
        Result: {
        Message: "Complaints updated successfully",
        complaint,
        },
    });
  } catch (err) {
        console.log(err);

        return res.status(500).json({
        StatusCode: 500,
        IsSuccess: false,
        ErrorMessage: "Unable to retrieve complaints, Server Error",
        Result: [],
        });
    }
};

// Add a new complaint
export const addComplaint = async (req, res, next) => {
  const { fullName, email, address, complaintCategory, description, attachments } = req.body;
  const { userId } = req.user;

  try {
    const complaint = await Complaint.create({
      fullName,
      email,
      address,
      complaintCategory,
      description,
      attachments,
      userId,
    });

    return res.status(200).json({
        StatusCode: 200,
        IsSuccess: true,
        ErrorMessage: [],
        Result: {
        Message: "Complaint added successfully",
        complaint,
        },
    });
  } catch (err) {
        console.log("Error occured", err);
        return res.status(500).json({
        StatusCode: 500,
        IsSuccess: false,
        ErrorMessage: "Unable to add complaint, Server Error",
        Result: [],
        });
    }
};

// Get complaint by ID
export const getComplaintById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).send({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: "Complain not found",
        Result: [],
    });
    }
    return res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        Message: "Complaint of provided Id found",
        complaint,
      },
    });
  } catch (err) {
        console.log(err);
        return res.status(500).json({
            StatusCode: 500,
            IsSuccess: false,
            ErrorMessage:
                "Unable to retrieve complaint of the provided id, Server Error",
            Result: [],
        });
    }
};

// Update complaint details
export const updateComplaint = async (req, res, next) => {
  const { id } = req.params;
  const { fullName, email, address, complaintCategory, description, attachments } = req.body;

  try {
    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { fullName, email, address, complaintCategory, description, attachments },
      { new: true } // This option returns the updated document
    );

    if (!complaint) {
      return res.status(404).send({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: "Complain not found",
        Result: [],
      });
    }

    return res.status(200).json({
        StatusCode: 200,
        IsSuccess: true,
        ErrorMessage: [],
        Result: {
            Message: "Complaint updated successfully",
            complaint,
        },
    });
  } catch (err) {
        console.log(err);
        return res.status(500).json({
            StatusCode: 500,
            IsSuccess: false,
            ErrorMessage: "Unable to update complaint, Server Error",
            Result: [],
        }); 
    }
};

// Delete complaint details
export const deleteComplaint = async (req, res, next) => {
  const { id } = req.params;

  try {
    const complaint = await Complaint.findByIdAndDelete(id);

    if (!complaint) {
        return res.status(404).send({ 
            StatusCode: 404,
            IsSuccess: false,
            ErrorMessage: 'Complain not found',
            Result: []
        });
    }

   return res.status(200).json({
        StatusCode: 200,
        IsSuccess: true,
        ErrorMessage: [],
        Result: {
            Message: "Complaint deleted successfully",
            complaint,
        },
    });
  } catch (err) {
        console.log("Error occured", err);
        
        return res.status(500).json({
            StatusCode: 500,
            IsSuccess: false,
            ErrorMessage: "Unable to delete complaint, Server Error",
            Result: [],
        }); 
    }
};
