import express, { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { responseFunc, validationFunc } from "../functions/functions";

const router = express.Router();

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