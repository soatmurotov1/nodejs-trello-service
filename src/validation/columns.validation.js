import Joi from "joi"



export const columnValidation = Joi.object({
  name: Joi.string().min(3).required()
})
