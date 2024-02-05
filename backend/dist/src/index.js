"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const auth = require("../src/controllers/auth");
const users_wallet = require("../src/controllers/users_wallet");
app.use("/auth", auth);
app.use("/users_wallet", users_wallet);
app.listen(4500, () => {
    console.log("Server is running on", 4500);
});
