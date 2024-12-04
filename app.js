const express = require("express");
const app = express();
const port = "8000";

const accountsRouter = require("./apis/accounts/routes");

app.use(express.json());
app.use("/api/accounts", accountsRouter);

app.listen(port, () => {
  console.log(`Server is now up at ${port} !`);
});
