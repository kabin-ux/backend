import Bin from "../Model/binModel.js";

// Get all bins
export const getAllBins = async (req, res, next) => {
  try {
    const bins = await Bin.find();
    if (!bins) {
      return res.status(404).json({ message: "Bin not found" });
    }
    return res.status(200).json({ bins });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving bins" });
  }
};

// Add a new bin
export const addBins = async (req, res, next) => {
  const { ID, latitude, longitude, landmark } = req.body;
  try {
    const bin = new Bin({ ID, latitude, longitude, landmark });
    await bin.save();
    return res.status(200).json({ bin });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add bin" });
  }
};

// Get bin by ID
export const getById = async (req, res, next) => {
  const { bid } = req.params;
  try {
    const bin = await Bin.findById(bid);
    if (!bin) {
      return res.status(404).json({ message: "Bin not found" });
    }
    return res.status(200).json({ bin });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving bin" });
  }
};

// Update bin
export const updateBin = async (req, res, next) => {
  const { bid } = req.params;
  const { ID, latitude, longitude, landmark } = req.body;
  try {
    const bin = await Bin.findByIdAndUpdate(
      bid,
      { ID, latitude, longitude, landmark },
      { new: true }
    );
    if (!bin) {
      return res.status(404).json({ message: "Bin not found or unable to update" });
    }
    return res.status(200).json({ bin });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating bin" });
  }
};

// Delete bin
export const deleteBin = async (req, res, next) => {
  const { bid } = req.params;
  try {
    const bin = await Bin.findByIdAndDelete(bid);
    if (!bin) {
      return res.status(404).json({ message: "Unable to delete bin" });
    }
    return res.status(200).json({ bin });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting bin" });
  }
};
