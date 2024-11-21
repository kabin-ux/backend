import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config.js";
import User from "../Model/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcrypt";

// Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users.length) {
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: "No users found",
        Result: [],
      });
    }

    return res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        Message: "Users retrieved successfully",
        users,
      },
    });
  } catch (err) {
    console.log("Error occured", err); // Log the error for debugging
    return res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Server error",
      Result: [],
    });
  }
};

// Add a new user
export const createUser = async (req, res, next) => {
  const { name, email, address, password, NID } = req.body;

  try {

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        StatusCode: 409,
        IsSuccess: false,
        ErrorMessage: "User with this email already exists",
        Result: [],
      });
    }
    // Create a new user
    const user = await User.create({
      name,
      email,
      address,
      password,
      NID,
    });

    return res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        Message: "User created successfully",
        user,
      },
    });

  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Unable to add user",
      Result: [],
    });
  }
};

// Get user by ID
export const getById = async (req, res, next) => {
  const { uid } = req.params;

  try {
    const user = await User.findById(uid);

    if (!user) {
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: "User not found",
        Result: [],
      });
    }
    return res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        Message: "User fetched successfully",
        DeletedUser: user,
      },
    });
  } catch (err) {
    console.log("Error occurred", err); // Log the error for debugging

    return res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Server error",
      Result: [],
    });
  }
};

// Update user details
export const updateUser = async (req, res, next) => {
  const { uid } = req.params;
  const { name, email, address, password, NID } = req.body;

  try {
    const updateData = { name, email, address, NID };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(uid, updateData, { new: true });

    if (!user) {
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        Message: "User not found or unable to update",
        ErrorMessage: [],
        Result: [],
      });
    }

    return res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        Message: "User updated successfully",
        UpdatedUser: user,
      },
    });
  } catch (err) {
    console.log("Error occured", err); // Log the error for debugging
    return res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Error occurred while updating user",
      Result: [],
    });
  }
};

// Delete a user
export const deleteUser = async (req, res, next) => {
  const { uid } = req.params;

  try {
    const user = await User.findByIdAndDelete(uid);

    if (!user) {
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: "User not found",
        Result: [],
      });
    }

    return res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        Message: "User deleted successfully",
        DeletedUser: user,
      },
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Server error",
      Result: [],
    });
  }
};

// User login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).json({
        StatusCode: 400,
        IsSuccess: false,
        ErrorMessage: "User does not exist",
        Result: [],
      });
    }

    // Validate password (assuming you have a method isPasswordCorrect)
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        StatusCode: 401,
        IsSuccess: false,
        ErrorMessage: "Invalid user credentials",
        Result: [],
      });
    }

    // Generate token with user ID and type
    const userType = "user";
    const token = generateToken(user._id, userType);
    console.log("TOKEN-----", token);
    console.log("USERTYPE=-------", userType);

    // Respond with the token
    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      Message: "Login successful",
      ErrorMessage: [],
      token,
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Server error",
      Result: [],
    });
  }
};

// Get User by ID
export const getUserById = async (req, res, next) => {
  const { uid } = req.params;

  try {
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: "User not found",
        Result: [],
      });
    }
    return res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      Result: {
        Message: "User found",
        user,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Server error",
      Result: [],
    });
  }
};

