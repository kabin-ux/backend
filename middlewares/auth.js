import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import RequestService from '../Model/RequestModel.js';
import User from '../Model/userModel.js';
import Complaint from '../Model/ComplaintModel.js';
import Feedback from '../Model/FeedbackModel.js';
import Driver from '../Model/driverModel.js';
import Task from '../Model/taskModel.js';

// Middleware to verify the JWT access token
export const verifyJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied, no token provided' 
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Use ACCESS_TOKEN_SECRET for access token verification
    req.user = decoded; // Attach decoded token (including userType) to req.user
    console.log(decoded)

    next();
  } catch (error) {
    res.status(403).json({ 
      success: false,
      message: 'Invalid or expired access token' 
    });
    console.log("ASSA")
  }
};


// Middleware to check if the user's role matches one of the allowed roles for the route
export const authorizeUserType = (...allowedUserTypes) => (req, res, next) => {
  console.log("User Type in Token:", req.user?.userType); // Debug log
  console.log("Allowed User Types:", allowedUserTypes);   // Debug log
  
  // Check if user's role is in the allowed roles
  if (!allowedUserTypes.includes(req.user?.userType)) {
    console.log("Access forbidden: insufficient privileges"); 
    return res.status(403).json({ 
      message: 'Access forbidden: insufficient privileges' 
    });
  }

  next();
};


// Middleware to allow access if the user is the owner or an admin
export const authorizeRequestEdit = async (req, res, next) => {
  const userType = req.user?.userType;
  const userId = req.user?.userId;
  const requestId = req.params.id;

  // If admin, allow access
  if (userType === 'admin') {
    return next();
  }

  try {
    // Fetch the request by ID
    const request = await RequestService.findById(requestId);
    console.log("Request found", request)
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Check if the request belongs to the current user
    if (request.userId.toString() === userId) {
      return next(); // Allow access if the user is the owner
    }
    console.log("ERROR")
    return res.status(403).json({ message: 'Access forbidden: insufficient privileges' });
  } catch (error) {
    console.log("server error")
    return res.status(500).json({ message: 'Server error' });
  }
};


// Middleware to allow access if the user is the owner or an admin
export const authorizeUserDetailsEdit = async (req, res, next) => {
  const userType = req.user?.userType;
  const userId = req.user?.userId;

  // If admin, allow access
  if (userType === 'admin') {
    return next();
  }

  try {
    // Fetch the request by ID
    const user = await User.findById(userId);
    console.log("User found", user)
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Check if the request belongs to the current user
    if (user._id.toString() === userId) {
      return next(); // Allow access if the user is the owner
    }
    console.log("ERROR!! User is not the owner")
    return res.status(403).json({ 
      success: false,
      message: 'Access forbidden: User is not the owner' 
    });
  } catch (error) {
    console.log("server error")
    return res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};

// Middleware to allow access if the user is the owner or an admin
export const authorizeComplaintEdit = async (req, res, next) => {
  const userType = req.user?.userType;
  const userId = req.user?.userId;
  const complaintId = req.params.id;

  // If admin, allow access
  if (userType === 'admin') {
    return next();
  }

  try {
    // Fetch the complaint by ID
    const complaint = await Complaint.findById(complaintId);
    
    if (!complaint) {
      return res.status(404).json({ 
        success: false,
        message: 'Complaint not found' 
      });
    }

    console.log("User ID from token:", userId);
    console.log("User Type:", userType);
    console.log("Complaint User ID:", complaint.userId.toString());
    // Check if the request belongs to the current user
    if (complaint.userId.toString() === userId) {
      return next(); // Allow access if the user is the owner
    }

    // If not owner or admin, deny access
    return res.status(403).json({ 
      success: false,
      message: 'Access forbidden: insufficient privileges',
      Result: []
    });
  } catch (error) {
    console.error("Error during complaint authorization:", error);
    return res.status(500).json({ 
      success: false,
      message: 'Server error occurred while authorizing request',
      Result: []
    });
  }
};


// Middleware to allow access if the user is the owner or an admin
export const authorizeFeedbackEdit = async (req, res, next) => {
  const userType = req.user?.userType;
  const userId = req.user?.userId;
  const feedbackId = req.params.id;

  // If admin, allow access
  if (userType === 'admin') {
    return next();
  }

  try {
    // Fetch the complaint by ID
    const feedback = await Feedback.findById(feedbackId);
    
    if (!feedback) {
      return res.status(404).json({ 
        success: false,
        message: 'Feedback not found',
        Result: []
      });
    }

    console.log("User ID from token:", userId);
    console.log("User Type:", userType);
    console.log("Feedback User ID:", feedback.userId.toString());
    // Check if the request belongs to the current user
    if (feedback.userId.toString() === userId) {
      return next(); // Allow access if the user is the owner
    }

    // If not owner or admin, deny access
    return res.status(403).json({ 
      success: false,
      message: 'Access forbidden: insufficient privileges' ,
      Result: []
    });
  } catch (error) {
    console.error("Error during feedback authorization:", error);
    return res.status(500).json({ 
      success: false,
      message: 'Server error occurred while authorizing request',
      Result: []
    });
  }
};

// Middleware to allow access if the driver is the driver who has been assigned with task or an admin
export const authorizeDriver = async (req, res, next) => {
  const userType = req.user?.userType;
  const userId = req.user?.userId;
  const tid = req.params.tid;

  // If admin, allow access
  if (userType === 'admin') {
    return next();
  }

  try {
    // Fetch the task by ID
    console.log("TASK ID ", tid)
    const task = await Task.findById(tid);
    console.log("TASK----", task)
    
    if (!task) {
      return res.status(404).json({ 
        success: false,
        message: 'Task not found',
        Result: []
      });
    }

    console.log("User ID from token:", userId);
    console.log("User Type:", userType);
    console.log("Task User ID:", task.driverId.toString());
    // Check if the request belongs to the current user
    if (task.driverId.toString() === userId) {
      return next(); // Allow access if the user is the owner
    }

    // If not owner or admin, deny access
    return res.status(403).json({ 
      success: false,
      message: 'Access forbidden: insufficient privileges' ,
      Result: []
    });
  } catch (error) {
    console.error("Error during task authorization:", error);
    return res.status(500).json({ 
      success: false,
      message: 'Server error occurred while authorizing request',
      Result: []
    });
  }
};
