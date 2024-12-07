const express = require("express");
const app = express();
const port = "8000";

const accountsRouter = require("./apis/accounts/routes");
const connectDB = require("./database");

app.use(express.json());
app.use("/api/accounts", accountsRouter);

connectDB()

app.listen(port, () => {
  console.log(`Server is now up at ${port} !`);
});
