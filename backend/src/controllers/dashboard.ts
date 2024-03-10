import express, { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { responseFunc, validationFunc } from "../functions/functions";
import {dbwallet_transactions} from "../models/dbwallet_transactions";

const router = express.Router();

router.post("/get_data", getDashboardDataSchema, getDashboardData);
router.post("/income_expense_summary", incomeExpenseSummarySchema, incomeExpenseSummary);

//Validation Schema
async function incomeExpenseSummarySchema(req : Request, res : Response, next : NextFunction) {
    const schema = Joi.object({
        user_id : Joi.number().integer().greater(0).required(),
      });

      const validate = await validationFunc(schema, req.body);

      if (validate.error) {
        res.json(responseFunc(400, validate.message, []))
      }
      next();
}


async function incomeExpenseSummary(req : Request, res : Response) {
    console.log("-----Fetching Income Expense Summary-----");
}

async function getDashboardDataSchema(req: Request, res : Response, next : NextFunction) {
  const schema = Joi.object({
    user_id : Joi.number().integer().greater(0).required(),
  });

  const validate = await validationFunc(schema, req.body);

  if (validate.error) {
    res.json(responseFunc(400, validate.message, []))
  }
  next();
}

async function getDashboardData(req:Request, res : Response) {
  console.log("______Getting Dashboard Data______");
  let wallet_transaction = new dbwallet_transactions();
  let result = await wallet_transaction.getMonthlyIncomeExpense(req.body.user_id, false, false, true);

  if(result.error) {
    res.json(responseFunc(400, result.message, result.data));
  } else {
    res.json(responseFunc(200, result.message, result.data));
  }
}

module.exports = router;
