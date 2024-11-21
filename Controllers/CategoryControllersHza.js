import Hazardous from "../Model/CategoryModelsHza.js";

// Get all hazardous categories
export const getAllHazardous = async (req, res, next) => {
  try {
    const hazardous = await Hazardous.find();
    if (!hazardous) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ hazardous });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving categories" });
  }
};

// Add a new hazardous category
export const addHazardous = async (req, res, next) => {
  const { WasteType, Quantity, DateOfCollection, Location, TransportMethod, Notes } = req.body;
  try {
    const hazardous = new Hazardous({ WasteType, Quantity, DateOfCollection, Location, TransportMethod, Notes });
    await hazardous.save();
    return res.status(200).json({ hazardous });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add category" });
  }
};

// Get hazardous category by ID
export const getHazardousById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const hazardous = await Hazardous.findById(id);
    if (!hazardous) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ hazardous });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving category" });
  }
};

// Update hazardous category
export const updateHazardous = async (req, res, next) => {
  const { id } = req.params;
  const { WasteType, Quantity, DateOfCollection, Location, TransportMethod, Notes } = req.body;
  try {
    const hazardous = await Hazardous.findByIdAndUpdate(
      id,
      { WasteType, Quantity, DateOfCollection, Location, TransportMethod, Notes },
      { new: true }
    );
    if (!hazardous) {
      return res.status(404).json({ message: "Unable to update category" });
    }
    return res.status(200).json({ hazardous });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating category" });
  }
};

// Delete hazardous category
export const deleteHazardous = async (req, res, next) => {
  const { id } = req.params;
  try {
    const hazardous = await Hazardous.findByIdAndDelete(id);
    if (!hazardous) {
      return res.status(404).json({ message: "Unable to delete category" });
    }
    return res.status(200).json({ hazardous });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting category" });
  }
};
