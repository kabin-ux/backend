import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    First_Name: {
        type: String, // datatype
        required: true, // validate
    },
    Last_Name: {
        type: String, // datatype
        required: true, // validate
    },
    NIC: {
        type: String, // datatype
        required: true, // validate
    },
    Employee_ID: {
        type: String, // datatype
        required: true, // validate
    },
    Designation: {
        type: String, // datatype
        required: true, // validate
    },
    Basic_Salary: {
        type: Number, // datatype
        required: true, // validate
    },
    Allowance: {
        type: Number, // datatype
        required: true, // validate
    },
    Credit: {
        type: Number,
        required: true,
    },
    Debit: {
        type: Number,
        required: true,
    },
    ETF: {
        type: Number, // datatype
        required: true, // validate
    },
    EPF: {
        type: Number, // datatype
        required: true, // validate
    },
    Total_Salary: {
        type: Number, // datatype
        required: true, // validate
    },
});

const Account = mongoose.model("Account", accountSchema);
export default Account;
