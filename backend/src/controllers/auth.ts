import express, {Express, NextFunction, Request, Response} from "express";
import Joi from "joi";
import {hashPassword, responseFunc, validationFunc} from "../functions/functions";
import {db} from "../models/db";
import moment from "moment";
import {dbusers} from "../models/dbusers";

const router = express.Router();

router.post("/login", loginSchema, login);
router.post("/signup", signUpSchema, signUp);

async function loginSchema(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(3).required().label("Password")
  });

  const validate = await validationFunc(schema, req.body);

  if (validate.error) {
    res.json(responseFunc(400, validate.message, []))
  } else {
    next();
  }
}

async function login(req: Request, res: Response) {
  let userObj = new dbusers();
  let result : any = await userObj.login(req.body.email, req.body.password);

  if(result.error) {
    res.json(responseFunc(400, result.message, result.data));
  } else {
    res.json(responseFunc(200, result.message, result.data));
  }
}

async function signUpSchema(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(3).required().label("Password"),
    mobile_no: Joi.string().length(10).pattern(/^[6-9]\d{9}$/).label("Mobile Number"),
    first_name: Joi.string().trim().required().label("First Name"),
    last_name: Joi.string().trim().required().label("Last Name")
  });

  const validate = await validationFunc(schema, req.body);

  if (validate.error) {
    res.json(responseFunc(400, validate.message, []))
  }
  next();
}

async function signUp(req: Request, res: Response) {
  let hashedPassword = await hashPassword(req.body.password);
  let signup_data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    mobile: req.body.mobile_no,
    password: hashedPassword,
    is_active: true,
    last_login: moment().format('YYYY-MM-DD HH:mm:ss'),
    created_date: moment().format('YYYY-MM-DD HH:mm:ss'),
    updated_date: moment().format('YYYY-MM-DD HH:mm:ss')
  }

  let userObj = new dbusers();
  let result : any = await userObj.signup(signup_data);

  if(result.error) {
    res.json(responseFunc(400, result.message, result.data));
  } else {
    res.json(responseFunc(200, result.message, result.data));
  }
}

module.exports = router;
