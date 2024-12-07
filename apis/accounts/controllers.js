const accounts = require("../../accounts");
const Account = require("../../models/Account");

exports.listAccountController = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (e) {
    res.status(500).json({ Message: e.Message });
  }
};

exports.accountUsernameController = (req, res) => {
  const { accountUsername } = req.params;
  const userAccount = accounts.find(
    (account) => account.username === accountUsername
  );
  console.log(userAccount);
  if (userAccount) {
    res.status(200).json(userAccount);
  } else {
    res.status(404).json();
  }
};

const createNewAccount = (newAccountData) => {
  post;
  console.log("Creating new account", newAccountData);
  const newId = accounts.length + 1;
  const newAccount = Object.assign({ id: newId }, newAccountData);
  console.log("The new account is: ", newAccount);
  return newAccount;
};

exports.createNewAccountController = async (req, res) => {
  try {
    const newAccount = await Account.create(req.body);
    res.status(201).json(newAccount);
  } catch (e) {
    res.status(500).json({ Message: e.Message });
  }
};

const updateAccount = (currentAccount, newData) => {
  put;
  const updatedAccount = Object.assign(currentAccount, newData);
  return updatedAccount;
};

exports.updateAccountController = async (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = await Account.findById(accountId);
    if (foundAccount) {
      await foundAccount.updateOne(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (e) {
    res.status(500).json({ Message: e.Message });
  }
};

const deleteAccount = (accountIdToBeDeleted) => {
  //delete
  const newAccounts = accounts.filter(
    (account) => account.id != accountIdToBeDeleted
  );
  console.log("The new accounts are: ", newAccounts);
};
exports.deleteAccountController = async (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = await Account.findById(accountId);
    if (foundAccount) {
      await foundAccount.remove(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (e) {
    res.status(500).json({ Message: e.Message });
  }
};
