import express, { Express } from "express";

const app : Express = express();

app.use(express.json());

const auth = require("../src/controllers/auth");
const users_wallet = require("../src/controllers/users_wallet");

app.use("/auth", auth);
app.use("/users_wallet", users_wallet);

app.listen(4500, () => {
    console.log("Server is running on", 4500);
})
