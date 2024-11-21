import Employee from '../Model/EmployeeModel.js';

// Get all employees
export const getEmployee = async (req, res, next) => {
    try {
        const employees = await Employee.find();
        if (employees.length === 0) {
            return res.status(404).json({ message: 'No employees found' });
        }
        return res.status(200).json({ employees });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Data insert
export const addEmployee = async (req, res, next) => {
    const { employeeId, employeeFirstName, employeeLastName, employeeNic, employeeCatogory, employeeAddress, employeeEmail, employeePhone, employeeSalary } = req.body;

    try {
        const employee = new Employee({ employeeId, employeeFirstName, employeeLastName, employeeNic, employeeCatogory, employeeAddress, employeeEmail, employeePhone, employeeSalary });
        await employee.save();
        return res.status(201).json({ employee }); // Use 201 for resource creation
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Unable to add Employee' }); // Improved error handling
    }
};

// Get employee by ID
export const getById = async (req, res, next) => {
    const employeeId = req.params.id;

    try {
        const employee = await Employee.findOne({ employeeId });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        return res.status(200).json({ employee });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Update employee details
export const updateEmployee = async (req, res, next) => {
    const employeeId = req.params.id;
    const { employeeFirstName, employeeLastName, employeeNic, employeeCatogory, employeeAddress, employeeEmail, employeePhone, employeeSalary } = req.body;

    try {
        const updatedEmployee = await Employee.findOneAndUpdate(
            { employeeId },
            { employeeFirstName, employeeLastName, employeeNic, employeeCatogory, employeeAddress, employeeEmail, employeePhone, employeeSalary },
            { new: true, runValidators: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        return res.status(200).json({ employee: updatedEmployee });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete employee
export const deleteEmployee = async (req, res, next) => {
    const employeeId = req.params.id;

    try {
        const deletedEmployee = await Employee.findOneAndDelete({ employeeId });
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        return res.status(200).json({ message: 'Employee deleted successfully', employee: deletedEmployee });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
