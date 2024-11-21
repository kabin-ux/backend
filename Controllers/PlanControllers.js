import Plan from '../Model/PlanModel.js'; 

// Data displayed
export const getAllPlans = async (req, res, next) => {
    let plans;

    // Get all plans
    try {
        plans = await Plan.find();
    } catch (err) {
        console.log(err);
    }

    // Not found
    if (!plans) {
        return res.status(404).json({ 
            success: false,
            message: "Plans not found",
            Result: []
        });
    }

    // Display all plans
    return res.status(200).json({ 
        success: true,
        message: "Plans fetched successfully",
        Result: plans 
    });
};

// Data inserted
export const addPlans = async (req, res, next) => {
    const { packageName, packagePrice, features } = req.body;
    let plans;

    try {
        plans = new Plan({ packageName, packagePrice, features });
        await plans.save();
    } catch (err) {
        console.log(err);
    }

    // Not inserted
    if (!plans) {
        return res.status(404).json({ 
            success: false,
            message: "Unable to add plans",
            Result: []
        });
    }

    return res.status(200).json({ 
        success: true,
        message: "Plans added successfully",
        Result: plans 
    });
};

// Get by ID
export const getPlanById = async (req, res, next) => {
    const id = req.params.id;
    let plan;

    try {
        plan = await Plan.findById(id);
    } catch (err) {
        console.log(err);
    }

    // Not available
    if (!plan) {
        return res.status(404).json({ 
            success: false,
            message: "Plan not found",
            Result: []
        });
    }

    return res.status(200).json({ 
        success: true,
        message: "Plan of the provided id fetched successfully",
        Result: plan
     });
};

// Update plan details
export const updatePlan = async (req, res, next) => {
    const id = req.params.id;
    const { packageName, packagePrice, features } = req.body;
    let plans;

    try {
        plans = await Plan.findByIdAndUpdate(id, { packageName, packagePrice, features }, { new: true });
    } catch (err) {
        console.log(err);
    }

    // Not updated
    if (!plans) {
        return res.status(404).json({ 
            success: false,
            message: "Unable to update plan details",
            Result: []
        });
    }

    return res.status(200).json({ 
        success: true,
        message: "Plan updated successfully",
        Result: plans 
    });
};

// Delete plan details
export const deletePlan = async (req, res, next) => {
    const id = req.params.id;
    let plan;

    try {
        plan = await Plan.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }

    // Not deleted
    if (!plan) {
        return res.status(404).json({ 
            success: false,
            message: "Unable to delete plan",
            Result: []
        });
    }

    return res.status(200).json({ 
        success: true,
        message: "Plan deleted successfully",
        Result: plan
    });
};
