import Recyclable from "../Model/CategoryModelOr.js";

// Get all categories
export const getAllRecyclable = async (req, res, next) => {
    try {
        const recyclable = await Recyclable.find();
        if (!recyclable) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json({ recyclable });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

// Add new category
export const addRecyclable = async (req, res, next) => {
    const { WasteType, Quantity, DateOfCollection, Location, TransportMethod, Notes } = req.body;

    try {
        const recyclable = new Recyclable({ WasteType, Quantity, DateOfCollection, Location, TransportMethod, Notes });
        await recyclable.save();
        return res.status(200).json({ recyclable });
    } catch (err) {
        console.log(err);
        return res.status(404).json({ message: "Unable to add category" });
    }
};

// Get category by ID
export const getRecyclableById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const recyclable = await Recyclable.findById(id);
        if (!recyclable) {
            return res.status(404).json({ message: "Category Not Found" });
        }
        return res.status(200).json({ recyclable });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

// Update category details
export const updateRecyclable = async (req, res, next) => {
    const { id } = req.params;
    const { WasteType, Quantity, DateOfCollection, Location, TransportMethod, Notes } = req.body;

    try {
        const recyclable = await Recyclable.findByIdAndUpdate(
            id,
            { WasteType, Quantity, DateOfCollection, Location, TransportMethod, Notes },
            { new: true }
        );
        if (!recyclable) {
            return res.status(404).json({ message: "Unable to Update Category Details" });
        }
        return res.status(200).json({ recyclable });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

// Delete category
export const deleteRecyclable = async (req, res, next) => {
    const { id } = req.params;

    try {
        const recyclable = await Recyclable.findByIdAndDelete(id);
        if (!recyclable) {
            return res.status(404).json({ message: "Unable to Delete Category Details" });
        }
        return res.status(200).json({ recyclable });
    } catch (err) {
        console.log(err);
        next(err);
    }
};
