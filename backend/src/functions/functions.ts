import { NextFunction } from 'express';
import Joi from 'joi';
import bcrypt from 'bcrypt';

export const validationFunc = async (schema : any, body_data : any) => {
    const { error } = schema.validate(body_data);
    // console.log("Error : ", error.details[0].message);
    if (error) {
        return {error : true, message  : error.details[0].message};
    }
    return {error : false, message : ""};
}

export const responseFunc = (status : number, message : string, data : any[]) => {
  // console.log(message, data);
    return {
        status : status,
        message : message,
        data : data
    }
}

//Create hashed password
export const hashPassword = async (password : string) => {
    // Generate a salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

