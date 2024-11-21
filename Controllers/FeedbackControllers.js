import Feedback from "../Model/FeedbackModel.js";

// Get all feedback
export const getAllFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.find();

    if (!feedback || feedback.length === 0) {
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: "Feedbacks not found",
        Result: [],
      });
    }

    return res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      Result: {
        Message: "Feedbacks retrieved successfully",
        feedback,
      },
      ErrorMessage: [],
    });
  } catch (err) {
    console.log("Error occurred", err);

    return res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Error occurred while retrieving feedback",
      Result: [],
    });
  }
};

// Add feedback
export const addFeedback = async (req, res, next) => {
  const { name, email, address, phone, comment, rating } = req.body;
  const { userId } = req.user;

  try {
    const feedback = await Feedback.create({
      name,
      email,
      address,
      phone,
      comment,
      rating,
      userId,
    });

    return res.status(201).json({
      StatusCode: 201,
      IsSuccess: true,
      Result: {
        Message: "Feedback added successfully",
        feedback,
      },
      ErrorMessage: [],
    });
  } catch (err) {
    console.log("Error occured ", err);

    return res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Unable to add feedback, Server Error",
      Result: [],
    });
  }
};

// Get feedback by ID
export const getFeedbackById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: "Feedback not found",
        Result: [],
      });
    }

    return res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      Result: {
        Message: "Feedback found successfully",
        feedback,
      },
      ErrorMessage: [],
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Unable to retrieve feedback, Server Error",
      Result: [],
    });
  }
};

// Update feedback details
export const updateFeedback = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, address, phone, comment, rating } = req.body;

  try {
    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { name, email, address, phone, comment, rating },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!feedback) {
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: "Feedback not found",
        Result: [],
      });
    }
    return res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      Result: {
        Message: "Feedback updated successfully",
        feedback,
      },
      ErrorMessage: [],
    });
  } catch (err) {
    console.log("Error occured", err);

    return res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Unable to update feedback, Server Error",
      Result: [],
    });
  }
};

// Delete feedback details
export const deleteFeedback = async (req, res, next) => {
  const { id } = req.params;

  try {
    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: "Feedback not found",
        Result: [],
      });
    }

    return res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      Result: {
        Message: "Feedback deleted successfully",
        feedback,
      },
      ErrorMessage: [],
    });
  } catch (err) {
    console.log("Error occured", err);

    return res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Unable to delete feedback, Server Error",
      Result: [],
    });
  }
};
