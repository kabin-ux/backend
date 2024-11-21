import Support from '../Model/SupportModel.js'; // Import the model

// Data display
export const getAllSupport = async (req, res, next) => {
    let support;
    try {
        support = await Support.find();
    } catch (err) {
        console.log(err);
    }
    // If details not found
    if (!support) {
        return res.status(404).json({ 
            success: false,
            message: 'Support not found',
            Result: []
        });
    }
    // Display all support
    return res.status(200).json({ 
        success: true,
        message: "Support fetched successfully",
        Result: support
    });
};

// Data insert
export const addSupport = async (req, res, next) => {
    const { additonalServices, name, email, address, city, subject, message } = req.body;
    let support;

    try {
        support = new Support({ additonalServices, name, email, address, city, subject, message });
        await support.save();
    } catch (err) {
        console.log(err);
    }

    // Not inserted
    if (!support) {
        return res.status(404).send({
            success: false,
            message: "Unable to add support",
            Result: []
        });
    }
    return res.status(200).json({
        success: true,
        message: "Support added successfully",
        Result: support 
    });
};

// Get by ID
export const getById = async (req, res, next) => {
    const id = req.params.id;
    let support;

    try {
        support = await Support.findById(id);
    } catch (err) {
        console.log(err);
    }

    // Not available support
    if (!support) {
        return res.status(404).send({ 
            success: false,
            message: "Support of the provided Id not found", 
            Result: []
        });
    }
    return res.status(200).json({ 
        success: true,
        message: "Support of the provided Id found",
        Result: support 
    });
};

// Update support details
export const updateSupport = async (req, res, next) => {
    const id = req.params.id;
    const { additonalServices, name, email, address, city, subject, message } = req.body;
    let supports;

    try {
        supports = await Support.findByIdAndUpdate(id, 
            { additonalServices, name, email, address, city, subject, message }, { new: true }
        );
    } catch (err) {
        console.log(err);
    }

    if (!supports) {
        return res.status(404).send({ 
            success: false,
            message: "Unable to update support",
            Result: []
        });
    }
    return res.status(200).json({ 
        success: true,
        message: "Support updated successfully",
        Result: supports
     });
};

// Delete support details
export const deleteSupport = async (req, res, next) => {
    const id = req.params.id;
    let support;

    try {
        support = await Support.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }

    if (!support) {
        return res.status(404).send({ 
            success: false,
            message: "Unable to delete support",
            Result: []
        });
    }
    return res.status(200).json({ 
        success: true,
        message: "Support deleted successfully",
        Result: support 
    });
};
