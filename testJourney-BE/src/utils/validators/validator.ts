import * as joi from "joi";

export const registerSchema = joi.object({
  fullname: joi.string(),
  email: joi.string().email(),
  password: joi.string(),
});

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});


