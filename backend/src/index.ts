import express, { Express } from "express";

const app : Express = express();

app.use(express.json());

const auth = require("../src/controllers/auth");

app.use("/auth", auth);

app.listen(4500, () => {
    console.log("Server is running on", 4500);
})