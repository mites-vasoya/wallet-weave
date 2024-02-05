"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const functions_1 = require("../functions/functions");
const moment_1 = __importDefault(require("moment"));
const dbusers_1 = require("../models/dbusers");
const router = express_1.default.Router();
router.post("/login", loginSchema, login);
router.post("/signup", signUpSchema, signUp);
function loginSchema(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = joi_1.default.object({
            email: joi_1.default.string().email().required().label("Email"),
            password: joi_1.default.string().min(8).required().label("Password")
        });
        const validate = yield (0, functions_1.validationFunc)(schema, req.body);
        if (validate.error) {
            res.json((0, functions_1.responseFunc)(400, validate.message, []));
        }
        next();
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userObj = new dbusers_1.dbusers();
        let result = yield userObj.login(req.body.email, req.body.password);
        if (result.error) {
            res.json((0, functions_1.responseFunc)(400, result.message, result.data));
        }
        else {
            res.json((0, functions_1.responseFunc)(200, result.message, result.data));
        }
    });
}
function signUpSchema(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = joi_1.default.object({
            email: joi_1.default.string().email().required().label("Email"),
            password: joi_1.default.string().min(8).required().label("Password"),
            mobile_no: joi_1.default.string().length(10).pattern(/^[6-9]\d{9}$/).label("Mobile Number"),
            first_name: joi_1.default.string().trim().required().label("First Name"),
            last_name: joi_1.default.string().trim().required().label("Last Name")
        });
        const validate = yield (0, functions_1.validationFunc)(schema, req.body);
        if (validate.error) {
            res.json((0, functions_1.responseFunc)(400, validate.message, []));
        }
        next();
    });
}
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let hashedPassword = yield (0, functions_1.hashPassword)(req.body.password);
        let signup_data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            mobile: req.body.mobile_no,
            password: hashedPassword,
            is_active: true,
            last_login: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            created_date: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            updated_date: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')
        };
        let userObj = new dbusers_1.dbusers();
        let result = yield userObj.signup(signup_data);
        if (result.error) {
            res.json((0, functions_1.responseFunc)(400, result.message, result.data));
        }
        else {
            res.json((0, functions_1.responseFunc)(200, result.message, result.data));
        }
    });
}
module.exports = router;
