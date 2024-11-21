import Task from "../Model/taskModel.js"; // Import the Task model

// Get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      Result: {
        Message: "Tasks retrieved successfully",
        tasks,
      },
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Error fetching tasks",
      error: err.message,
      Result: [],
    });
  }
};

// Add a new task
export const addTask = async (req, res) => {
  const { driverId, binIds, taskId, duration } = req.body;
  console.log({ driverId, binIds, taskId, duration });

  try {
    const task = await Task.create({ driverId, binIds, taskId, duration });
    res.status(201).json({
      StatusCode: 201,
      IsSuccess: true,
      Result: {
        Message: "Task added successfully",
        task,
      },
    });
  } catch (err) {
    console.log("Error occured", err);
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Error adding task",
      Result: [],
    });
  }
};

// Update task status
export const updateTaskStatus = async (req, res) => {
  const { tid } = req.params;
  const { completionStatus } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      tid,
      { completionStatus },
      { new: true }
    );
    if (!task)
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: "Task not found",
        Result: [],
      });
    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      Result: {
        Message: "Task status updated",
        task,
      },
    });
  } catch (err) {
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Error updating task status",
      Result: [],
    });
  }
};

// Get task by ID
export const getTaskById = async (req, res) => {
  const { tid } = req.params;

  try {
    const task = await Task.findById(tid);

    if (!task)
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: "Task not found",
        Result: [],
      });
    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      Result: {
        Message: "Task fetched successfully",
        task,
      },
    });
  } catch (err) {
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Error fetching task",
      Result: [],
    });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  const { tid } = req.params;

  try {
    const task = await Task.findByIdAndDelete(tid);

    if (!task) {
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: "Task not found",
        Result: [],
      });
    }

    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      Result: {
        Message: "Task deleted successfully",
        task,
      },
    });
  } catch (err) {
    res.json({
        StatusCode: 500,
        IsSuccess: false,
        ErrorMessage: "Error deleting task",
        Result: [],
    });
  }
};
