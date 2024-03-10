"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const auth = require("../src/controllers/auth");
const users_wallet = require("../src/controllers/users_wallet");
const dashboard = require("../src/controllers/dashboard");
app.use("/auth", auth);
app.use("/users_wallet", users_wallet);
app.use("/dashboard", dashboard);
app.listen(4500, () => {
    console.log("Server is running on", 4500);
});
