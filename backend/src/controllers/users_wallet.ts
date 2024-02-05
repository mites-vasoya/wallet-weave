import express, {Request, Response, NextFunction} from "express";
import Joi from "joi";
import {responseFunc, validationFunc} from "../functions/functions";
import {dbusers_wallet} from "../models/dbusers_wallet";

const router = express.Router();

router.get("/list", listWalletSchema, listWallet);

async function listWalletSchema(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    user_id : Joi.number().integer().required()
  });

  const validate = await validationFunc(schema, req.body);

  if (validate.error) {
    res.json(responseFunc(400, validate.message, []))
  }
  next();
}


async function listWallet (req : Request, res : Response) {
  let users_walletObj = new dbusers_wallet();
  let result : any = await users_walletObj.listUsersWallets(req.body.user_id);

  console.log(result);

  if(result.error) {
    res.json(responseFunc(400, result.message, result.data));
  } else {
    res.json(responseFunc(200, result.message, result.data));
  }
}

module.exports = router;
