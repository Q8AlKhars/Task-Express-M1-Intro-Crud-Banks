const express = require("express");
const accounts = require("./accounts");

const app = express();

const port = "8000";

app.use(express.json());

const createNewAccount = (newAccountData) => {
  //post
  console.log("Creating new account", newAccountData);
  const newId = accounts.length + 1;
  const newAccount = Object.assign({ id: newId }, newAccountData);
  console.log("The new account is: ", newAccount);
  return newAccount;
};

const updateAccount = (currentAccount, newData) => {
  //put
  const updatedAccount = Object.assign(currentAccount, newData);
  return updatedAccount;
};

const deleteAccount = (accountIdToBeDeleted) => {
  //delete
  const newAccounts = accounts.filter(
    (account) => account.id != accountIdToBeDeleted
  );
  console.log("The new accounts are: ", newAccounts);
};

app.get("/accounts", (req, res) => {
  res.json(accounts);
});

app.put("/accounts/:accountId", (req, res) => {
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

app.delete("/accounts/:accountId", (req, res) => {
  const { accountId } = req.params;
  const account = accounts.find((account) => account.id == accountId);
  if (account) {
    deleteAccount(accountId);
    res.status(204).end();
  } else {
    res.status(404).json();
  }
});

app.post("/accounts", (req, res) => {
  const newAccount = createNewAccount(req.body);
  res.status(201).json(newAccount);
});

app.get("/accounts/:accountUsername", (req, res) => {
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

app.listen(port, () => {
  console.log(`Server is now up at ${port} !`);
});
