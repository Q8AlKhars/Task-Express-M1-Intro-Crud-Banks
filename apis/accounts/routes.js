const express = require("express");

const router = express.Router();

const accounts = require("../../accounts");

router.get("/", (req, res) => {
  res.json(accounts);
});

router.get("/:accountUsername", (req, res) => {
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
});

const createNewAccount = (newAccountData) => {
  //post
  console.log("Creating new account", newAccountData);
  const newId = accounts.length + 1;
  const newAccount = Object.assign({ id: newId }, newAccountData);
  console.log("The new account is: ", newAccount);
  return newAccount;
};
router.post("/", (req, res) => {
  const newAccount = createNewAccount(req.body);
  res.status(201).json(newAccount);
});

const updateAccount = (currentAccount, newData) => {
  //put
  const updatedAccount = Object.assign(currentAccount, newData);
  return updatedAccount;
};
router.put("/:accountId", (req, res) => {
  const { accountId } = req.params;
  const account = accounts.find((account) => account.id == accountId);
  console.log(account);
  if (account) {
    const updatedAccount = updateAccount(account, req.body);
    res.status(200).json(updatedAccount);
  } else {
    res.status(404).json();
  }
});

const deleteAccount = (accountIdToBeDeleted) => {
  //delete
  const newAccounts = accounts.filter(
    (account) => account.id != accountIdToBeDeleted
  );
  console.log("The new accounts are: ", newAccounts);
};
router.delete("/:accountId", (req, res) => {
  const { accountId } = req.params;
  const account = accounts.find((account) => account.id == accountId);
  if (account) {
    deleteAccount(accountId);
    res.status(204).end();
  } else {
    res.status(404).json();
  }
});

module.exports = router;
