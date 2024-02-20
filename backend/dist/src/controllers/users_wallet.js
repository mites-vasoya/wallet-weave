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
const dbusers_wallet_1 = require("../models/dbusers_wallet");
const router = express_1.default.Router();
router.post("/list", listWalletSchema, listWallet);
function listWalletSchema(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = joi_1.default.object({
            user_id: joi_1.default.number().integer().required()
        });
        const validate = yield (0, functions_1.validationFunc)(schema, req.body);
        if (validate.error) {
            res.json((0, functions_1.responseFunc)(400, validate.message, []));
        }
        next();
    });
}
function listWallet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let users_walletObj = new dbusers_wallet_1.dbusers_wallet();
        let result = yield users_walletObj.listUsersWallets(req.body.user_id);
        // console.log(result);
        if (result.error) {
            res.json((0, functions_1.responseFunc)(400, result.message, result.data));
        }
        else {
            res.json((0, functions_1.responseFunc)(200, result.message, result.data));
        }
    });
}
module.exports = router;
