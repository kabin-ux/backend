// ErrorHandler.js
import AdminRegister from "../Model/AdminRegister.js";
import { generateToken } from "../utils/generateToken.js";

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await AdminRegister.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errMessage: "User does not exist"
      });
    }
    // Check password validity
    const isPasswordValid = await user.isPasswordCorrect(password);

    console.log("Entered password", password);
    console.log("Db password", user.password);
    
    console.log("Password valid?", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({
          errorMessage: "Invalid user credentials",
      });
    }

    // Retrieve user info excluding password and refresh token
    const loggedInUser = await AdminRegister.findById(user._id).select("-password -refreshToken");
    await loggedInUser.save();

    // Generate token with user ID and type
    const userType = "admin"; // Define based on user model, or derive based on the table
    const token = generateToken(user._id, userType);
    console.log("TOKEN-----", token);
    console.log("USERTYPE=-------", userType);

    res.json({
      StatusCode: 200,
      user: loggedInUser,
      token,
      message: "Login successful", 
      
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      err: "Server Error" 
    });
  }
};


