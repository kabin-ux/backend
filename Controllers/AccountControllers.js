import Account from "../Model/AccountModel.js";

// Get all accounts
export const getAllAccount = async (req, res, next) => {
  try {
    const accounts = await Account.find();
    if (!accounts) {
      return res.status(404).json({ message: "Accounts not found" });
    }
    return res.status(200).json({ accounts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving accounts" });
  }
};

// Add a new account
export const addAccount = async (req, res, next) => {
  const {
    First_Name,
    Last_Name,
    NIC,
    Employee_ID,
    Designation,
    Basic_Salary,
    Allowance,
    Credit,
    Debit,
    ETF,
    EPF,
    Total_Salary,
  } = req.body;

  try {
    const account = new Account({
      First_Name,
      Last_Name,
      NIC,
      Employee_ID,
      Designation,
      Basic_Salary,
      Allowance,
      Credit,
      Debit,
      ETF,
      EPF,
      Total_Salary,
    });
    await account.save();
    return res.status(200).json({ account });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add account" });
  }
};

// Get account by ID
export const getAccountById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const account = await Account.findById(id);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    return res.status(200).json({ account });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving account" });
  }
};

// Update account details
export const updateAccount = async (req, res, next) => {
  const { id } = req.params;
  const {
    First_Name,
    Last_Name,
    NIC,
    Employee_ID,
    Designation,
    Basic_Salary,
    Allowance,
    Credit,
    Debit,
    ETF,
    EPF,
    Total_Salary,
  } = req.body;

  try {
    const account = await Account.findByIdAndUpdate(
      id,
      {
        First_Name,
        Last_Name,
        NIC,
        Employee_ID,
        Designation,
        Basic_Salary,
        Allowance,
        Credit,
        Debit,
        ETF,
        EPF,
        Total_Salary,
      },
      { new: true }
    );

    if (!account) {
      return res.status(404).json({ message: "Unable to update account details" });
    }

    return res.status(200).json({ account });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating account details" });
  }
};

// Delete account details
export const deleteAccount = async (req, res, next) => {
  const { id } = req.params;
  try {
    const account = await Account.findByIdAndDelete(id);
    if (!account) {
      return res.status(404).json({ message: "Unable to delete account details" });
    }
    return res.status(200).json({ account });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting account" });
  }
};
