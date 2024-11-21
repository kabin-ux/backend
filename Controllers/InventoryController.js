import Inventory from '../Model/InventoryModel.js';

// Get all inventory
export const getInventory = async (req, res, next) => {
    try {
        const inventory = await Inventory.find();

        if (!inventory || inventory.length === 0) {
            return res.status(404).json({ 
                success: false,
                message: "Inventory not found" ,
                Result: []
            });
        }

        return res.status(200).json({ 
            success: true,
            message: "Inventory fetched successfully",
            Result: inventory 
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ 
            success: false,
            message: "Internal server error",
            Result: []
        });
    }
};

// Add inventory
export const addInventory = async (req, res, next) => {
    const {
        productName,
        productCategory,
        materialType,
        quantity,
        productDescription,
        unit,
    } = req.body;

    try {
        const inventory = new Inventory({
            productName,
            productCategory,
            materialType,
            quantity,
            productDescription,
            unit,
        });
        await inventory.save();
        return res.status(201).json({ 
            success: true,
            message: "Inventory added successfully",
            Result: inventory 
        }); // Use 201 for resource creation
    } catch (err) {
        console.error(err);
        return res.status(500).json({ 
            success: false,
            message: "Unable to add inventory",
            Result: []
        });
    }
};

// Get inventory by ID
export const getInventoryById = async (req, res, next) => {
    const inventoryId = req.params.Iid;

    try {
        const inventory = await Inventory.findById(inventoryId);

        if (!inventory) {
            return res.status(404).json({ 
                success: false,
                message: "Inventory not found",
                Result: []
            });
        }

        return res.status(200).json({ 
            success: true,
            message: "Inventory fetched successfully",
            Result: inventory
         });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ 
            success: false,
            message: "Internal server error",
            Result: []
        });
    }
};

// Update inventory details
export const updateInventory = async (req, res, next) => {
    const inventoryId = req.params.Iid;
    const {
        productName,
        productCategory,
        materialType,
        quantity,
        productDescription,
        unit,
        Date,
    } = req.body;

    try {
        const updatedInventory = await Inventory.findByIdAndUpdate(
            inventoryId,
            {
                productName,
                productCategory,
                materialType,
                quantity,
                productDescription,
                unit,
                Date,
            },
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedInventory) {
            return res.status(404).json({ 
                success: false,
                message: "Unable to update inventory, nventory not found",
                Result: []
            });
        }

        return res.status(200).json({ 
            success: true,
            message: "Inventory updated successfully",
            Result: updatedInventory 
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ 
            success: false,
            message: "Internal server error" ,
            Result: []
        });
    }
};

// Delete inventory
export const deleteInventory = async (req, res, next) => {
    const inventoryId = req.params.Iid;

    try {
        const deletedInventory = await Inventory.findByIdAndDelete(inventoryId);

        if (!deletedInventory) {
            return res.status(404).json({
                success: false,
                message: "Unable to delete inventory" ,
                Result: []
            });
        }

        return res.status(200).json({ 
            success: true,
            message: "Inventory deleted successfully",
            Result: deletedInventory
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ 
            success: false,
            message: "Internal server error",
            Result: []
        });
    }
};
