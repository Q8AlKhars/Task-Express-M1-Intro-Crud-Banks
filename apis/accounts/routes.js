const express = require("express");

const router = express.Router();

const {
  listAccountController,
  accountUsernameController,
  createNewAccountController,
  updateAccountController,
  deleteAccountController,
} = require("./controllers");

router.get("/", listAccountController);

router.get("/:accountUsername", accountUsernameController);

router.post("/", createNewAccountController);

router.put("/:accountId", updateAccountController);

router.delete("/:accountId", deleteAccountController);

module.exports = router;
