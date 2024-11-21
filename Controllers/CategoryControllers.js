import Category from "../Model/CategoryModel.js";

// Get all categories
export const getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ categories });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving categories" });
  }
};

// Add a new category
export const addCategory = async (req, res, next) => {
  const { WasteType, Quantity, DateOfCollection, Location, TransportMethod, Notes } = req.body;
  try {
    const category = new Category({ WasteType, Quantity, DateOfCollection, Location, TransportMethod, Notes });
    await category.save();
    return res.status(200).json({ category });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add category" });
  }
};

// Get category by ID
export const getCategoryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ category });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving category" });
  }
};

// Update category
export const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { WasteType, Quantity, DateOfCollection, Location, TransportMethod, Notes } = req.body;
  try {
    let category = await Category.findByIdAndUpdate(
      id,
      { WasteType, Quantity, DateOfCollection, Location, TransportMethod, Notes },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Unable to update category" });
    }
    return res.status(200).json({ category });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating category" });
  }
};

// Delete category
export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Unable to delete category" });
    }
    return res.status(200).json({ category });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting category" });
  }
};
