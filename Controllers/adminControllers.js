import Admin from "../Model/adminModel.js";

// Get all admins
export const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find();
    if (!admins) {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res.status(200).json({ admins });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving admins" });
  }
};

// Add a new admin
export const addAdmins = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const admin = new Admin({ name, email });
    await admin.save();
    return res.status(200).json({ admin });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add admin" });
  }
};

// Get admin by ID
export const getById = async (req, res, next) => {
  const { aid } = req.params;
  try {
    const admin = await Admin.findById(aid);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res.status(200).json({ admin });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving admin" });
  }
};

// Update admin
export const updateAdmin = async (req, res, next) => {
  const { aid } = req.params;
  const { name, email } = req.body;
  try {
    const admin = await Admin.findByIdAndUpdate(
      aid,
      { name, email },
      { new: true }
    );
    if (!admin) {
      return res.status(404).json({ message: "Admin not found or unable to update" });
    }
    return res.status(200).json({ admin });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating admin" });
  }
};

// Delete admin
export const deleteAdmin = async (req, res, next) => {
  const { aid } = req.params;
  try {
    const admin = await Admin.findByIdAndDelete(aid);
    if (!admin) {
      return res.status(404).json({ message: "Unable to delete admin" });
    }
    return res.status(200).json({ admin });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting admin" });
  }
};

// Admin login
export const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email, password });
    if (!admin) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    return res.status(200).json({ message: "Login successful", admin });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
