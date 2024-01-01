import express, { Express, NextFunction, Request, Response } from "express";
import Joi from "joi";
import { hashPassword, responseFunc, validationFunc } from "../functions/functions";
import { db } from "../models/db";
import moment from "moment";

const router = express.Router();

router.post("/login", loginSchema, login);
router.post("/signup", signUpSchema, signUp);

async function loginSchema(req : Request, res : Response, next : NextFunction) {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().min(8).required().label("Password"),
        mobile_no: Joi.string().length(10).pattern(/^[6-9]\d{9}$/).label("Mobile Number"),
        first_name : Joi.string().trim().required().label("First Name"),
        last_name : Joi.string().trim().required().label("Last Name")
    });

    const validate = await validationFunc(schema, req.body);

    if(validate.error) {
        res.json(responseFunc(400, validate.message, []))
    }
    next();
}


async function login(req : Request, res : Response) {
    console.log("---Logging---");
    let dbObj = new db();

    dbObj.table = "users";
    let result = await dbObj.selectOne();

    res.json(responseFunc(400, "data fetched", result))
}

async function signUpSchema(req : Request, res : Response, next : NextFunction) {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().min(8).required().label("Password"),
        mobile_no: Joi.string().length(10).pattern(/^[6-9]\d{9}$/).label("Mobile Number"),
        first_name : Joi.string().trim().required().label("First Name"),
        last_name : Joi.string().trim().required().label("Last Name")
    });

    const validate = await validationFunc(schema, req.body);

    if(validate.error) {
        res.json(responseFunc(400, validate.message, []))
    }
    next();
}

async function signUp(req : Request, res : Response) {
    console.log("Signing Up");
    let hashedPassword = await hashPassword(req.body.password);
    let register_data = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        mobile : req.body.mobile_no,
        password : hashedPassword,
        created_date : moment().format('YYYY-MM-DD'),
        updated_date : moment().format('YYYY-MM-DD')
    }

    let dbObj = new db();
    dbObj.table = "users";
    let result = await dbObj.insert(register_data);

    res.json(responseFunc(200, "Inserted", result));
}

module.exports = router;