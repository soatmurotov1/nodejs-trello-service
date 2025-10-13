import Joi from "joi"


export const userValidation = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(15).required()
})


export const boardValidation = Joi.object({
  title: Joi.string().min(3).required()
})


export const columnValidation = Joi.object({
  name: Joi.string().min(3).required()
})


export const taskValidation = Joi.object({
  title: Joi.string().min(3).required(),
  order: Joi.number().integer().min(3).required(),
  description: Joi.string(), 
  userId: Joi.number().integer().positive().required(),
  boardId: Joi.number().integer().positive().required(),
  columnId: Joi.number().integer().positive().required()
})




