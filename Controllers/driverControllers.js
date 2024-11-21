import Driver from "../Model/driverModel.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from 'bcrypt';

// Get all drivers
export const getAllDrivers = async (req, res, next) => {
  try {
    const drivers = await Driver.find();

    if (!drivers || drivers.length === 0) {
      return res.status(404).json({ 
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: 'Drivers not found',
        Result: []
      });
    }

    return res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      Result: {
          Message: "Drivers found successfully",
          drivers,
      },
      ErrorMessage: [],
     });
  } catch (err) {
      console.log("Error occured", err);

      return res.status(500).json({ 
        StatusCode: 500,
        IsSuccess: false,
        ErrorMessage: "Unable to retrieve drivers, Server Error",
        Result: [],
      }); // Error handling
  }
};

// Data insert
export const addDrivers = async (req, res, next) => {
  const { name, email, Dlicense, password, NID } = req.body;
  

  console.log("Frontend data@@@@@@@@",{ name, email, Dlicense, password, NID })

  try {
    const existingDriver = await Driver.findOne({email});

    if (existingDriver) {
      return res.status(409).json({
        StatusCode: 409,
        IsSuccess: false,
        ErrorMessage: "Driver with this email already exists",
        Result: [],
      });
    }

    const driver = await Driver.create({name, email, Dlicense, password, NID})

    console.log(driver)
    return res.status(201).json({  
      StatusCode: 200,
      IsSuccess: true,
      Result: {
          Message: "Driver created successfully",
          driver,
      },
      ErrorMessage: [], }); 
  } catch (err) {
      console.log("Error occured", err);
      
      return res.status(500).json({ 
        StatusCode: 500,
        IsSuccess: false,
        ErrorMessage: "Unable to add driver, Server Error",
        Result: [],
     }); // Error handling
  }
};

// Get driver by ID
export const getById = async (req, res, next) => {
  const {did} = req.params;

  try {
    const driver = await Driver.findById(did);
    if (!driver) {
      return res.status(404).json({ 
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: 'Driver of the id provided not found',
        Result: []
       });
    }
    return res.status(200).json({ 
      StatusCode: 200,
      IsSuccess: true,
      Result: {
          Message: "Driver of the id provided found successfully",
          driver,
      },
      ErrorMessage: [],
    });
  } catch (err) {
    console.log("Error occured", err);

    return res.status(500).json({ 
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Unable to retrieve driver, Server Error",
      Result: [],
    }); // Error handling
  }
};

// Update driver
export const updateDriver = async (req, res, next) => {
  const { did } = req.params;
  const { name, email, Dlicense, password, NID } = req.body; // Ensure keys match schema


  try {
    const updateDriverData = {name, email, Dlicense, NID};

    if(password){
      const salt = await bcrypt.genSalt(10);
      updateDriverData.password = await bcrypt.hash(password, salt);
    }

    const driver = await Driver.findByIdAndUpdate(
      did,
      updateDriverData,
      { new: true } // Return the updated driver
    );
    console.log("Driver", driver)


    if (!driver) {
      return res
        .status(404)
        .json({ 
          StatusCode: 404,
          IsSuccess: false,
          ErrorMessage: 'Driver not found',
          Result: []
        });
    }
    return res.status(200).json({ 
      StatusCode: 200,
      IsSuccess: true,
      Result: {
          Message: "Driver updated successfully",
          driver,
      },
      ErrorMessage: [],
    });
  } catch (err) {
    console.log("Error occured", err);

    return res
      .status(500)
      .json({
          StatusCode: 500,
          IsSuccess: false,
          ErrorMessage: "Unable to update driver, Server Error",
          Result: [],
      }); // Error handling
  }
};

// Delete driver
export const deleteDriver = async (req, res, next) => {
  const {did} = req.params;

  try {
    const driver = await Driver.findByIdAndDelete(did);
    if (!driver) {
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: 'Driver not found',
        Result: []
      });
    }
    return res.status(200).json({ 
      StatusCode: 200,
      IsSuccess: true,
      Result: {
          Message: "Driver deleted successfully",
          driver
      },
      ErrorMessage: [],
    });
  } catch (err) {
    console.log("Error occured", err);
    return res.status(500).json({ 
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Unable to delete driver, Server Error",
      Result: [],
    }); // Error handling
  }
};

// Login driver
export const loginDriver = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await Driver.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: 'Driver not found',
        Result: []
    });
    }

    // Validate password (assuming you have a method isPasswordCorrect)
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        errorMessage: "Invalid user credentials",
      });
    }

    // Generate token with user ID and type
    const userType = "driver"; // Define based on user model, or derive based on the table
    const token = generateToken(user._id, userType);
    console.log("TOKEN-----", token);

    console.log("USERTYPE=-------", userType);

    return res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      Result: {
        Message: "Driver found successfully",
        user
      },
      ErrorMessage: [],
      token
    });
  } catch (err) {
    console.log("Error occured", err)
    return res.status(500).json({ 
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Unable to retrieve requests, Server Error",
      Result: [],
    });
  }
};
