import Joi from "joi"



export const taskValidation = Joi.object({
  title: Joi.string().min(3).required(),
  order: Joi.number().integer().min(3).required(),
  description: Joi.string(), 
  userId: Joi.number().integer().positive().required(),
  boardId: Joi.number().integer().positive().required(),
  columnId: Joi.number().integer().positive().required()
})

