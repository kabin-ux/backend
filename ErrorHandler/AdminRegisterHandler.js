// errorhandler/registerHandler.js
import AdminRegister from "../Model/AdminRegister.js";

// Registration handler
export const registerAdmin = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  try {
    const user = await AdminRegister.create({ fname, lname, email, password });
    return res.json({
        StatusCode: 200,
        IsSuccess: true,
        ErrorMessage: [],
        Result: {
            message: "User created successfully",
            user
        }
    })
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ errorMessage: "An error occurred while registering the user" });
  }
};
