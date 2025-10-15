import Joi from "joi"


export const columnValidation = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.base": "name string bulishi kerak",
    "string.min": "name kamida 2 ta bulishi kerak",
    "any.required": "name shart"
  })
})
