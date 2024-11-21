import RequestService from '../Model/RequestModel.js';
import axios from 'axios'; // Import axios for handling HTTP requests

// Data display
export const getAllRequests = async (req, res, next) => {

    // Get all requests
    try {
        const requests = await RequestService.find();

        if (!requests) {
            return res.status(404).json({ 
                StatusCode: 404,
                IsSuccess: false,
                ErrorMessage: 'Requests not found',
                Result: []
            });
        }

        return res.status(200).json({
            StatusCode: 200,
            IsSuccess: true,
            Result: {
                Message: "Requests found successfully",
                requests,
            },
            ErrorMessage: [],
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            StatusCode: 500,
            IsSuccess: false,
            ErrorMessage: "Unable to retrieve requests, Server Error",
            Result: [],
        }); 
    }
};

// Data insert
export const addRequests = async (req, res, next) => {
    const { service, name, address, phoneNumber, date, time } = req.body;
    const { userId } = req.user; 


    try {
        const request = await RequestService.create({ service, name, address, phoneNumber, date, time, userId });

        return res.status(200).json({
            StatusCode: 200,
            IsSuccess: true,
            Result: {
                Message: "Request added successfully",
                request,
            },
            ErrorMessage: [],
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            StatusCode: 500,
            IsSuccess: false,
            ErrorMessage: "Unable to add requests, Server Error",
            Result: [],
        }); 
    }
};

// Get by ID
export const getRequestById = async (req, res, next) => {
    const {id} = req.params;

    try {
        const request = await RequestService.findById(id);

        if (!request) {
            return res.status(404).json({ 
                StatusCode: 404,
                IsSuccess: false,
                ErrorMessage: 'Request of provided id not found',
                Result: []
            });
        }

        return res.status(200).json({
            StatusCode: 200,
            IsSuccess: true,
            ErrorMessage: [],
            Result: {
                Message: "Request of id provided found successfully",
                request,
            },
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            StatusCode: 500,
            IsSuccess: false,
            ErrorMessage: "Unable to retrieve request of the id provided, Server Error",
            Result: [],
        }); 
    }
};

// Update request details
export const updateRequest = async (req, res, next) => {
    const {id} = req.params;
    const { service, name, address, phoneNumber, date, time } = req.body;

    try {
        const request = await RequestService.findByIdAndUpdate(id, { service, name, address, phoneNumber, date, time }, { new: true });

        if (!request) {
            return res.status(404).json({ 
                StatusCode: 404,
                IsSuccess: false,
                ErrorMessage: 'Requests not found',
                Result: []
            });
        }

        return res.status(200).json({
            StatusCode: 200,
            IsSuccess: true,
            Result: {
                Message: "Request updated successfully",
                request,
            },
            ErrorMessage: [],
        });

    } catch (err) {
        console.log("Error occured", err);
        
        return res.status(500).json({
            StatusCode: 500,
            IsSuccess: false,
            ErrorMessage: "Unable to update request, Server Error",
            Result: [],
        }); 
    }
};

// Delete request
export const deleteRequest = async (req, res, next) => {
    const {id} = req.params;

    try {
        const request = await RequestService.findByIdAndDelete(id);

        if (!request) {
            return res.status(404).json({ 
                StatusCode: 404,
                IsSuccess: false,
                ErrorMessage: 'Request not found',
                Result: []
            });
        }

        return res.status(200).json({
            StatusCode: 200,
            IsSuccess: true,
            Result: {
                Message: "Request deleted successfully",
                request,
            },
            ErrorMessage: [],
        });

    } catch (err) {
        console.log("Error occured" , err);

        return res.status(500).json({
            StatusCode: 500,
            IsSuccess: false,
            ErrorMessage: "Unable to delete request, Server Error",
            Result: [],
        }); 
    }
};

// Update request status
export const updateRequestStatus = async (req, res) => {
    const { id } = req.params; // Extract the request ID from the URL
    const { status } = req.body; // Get the new status from the request body

    try {
        // Update the request in the database
        const updatedRequest = await RequestService.findByIdAndUpdate(id, { status }, { new: true });

        if (!updateRequest) {
            return res.status(404).json({ 
                StatusCode: 404,
                IsSuccess: false,
                ErrorMessage: "Request not found",
                Result: []
            });
        }

        return res.status(200).json({
            StatusCode: 200,
            IsSuccess: true,
            ErrorMessage: [],
            Result: {
                Message: "Request updated successfully",
                updatedRequest,
            },
        });

    } catch (error) {
        console.log("Error occured", error);
        
        return res.status(500).json({
            StatusCode: 500,
            IsSuccess: false,
            ErrorMessage: "Unable to retrieve request, Server Error",
            Result: [],
        }); 
    }
};

// Handle status change with Axios
export const handleStatusChange = async (id, newStatus) => {
    try {
        const response = await axios.put(`http://localhost:5001/request/${id}`, {
            status: newStatus,
        });

        // Check if the update was successful
        if (response.status === 200) {
            setRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request._id === id ? { ...request, status: newStatus } : request
                )
            );
        }
    } catch (error) {
        console.error("Error updating status:", error);
    }
};
