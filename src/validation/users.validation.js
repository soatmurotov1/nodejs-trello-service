import Joi from "joi"


export const usersValidation = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.required": "name shart",
    "string.empty": "name bush bulish mumkin emas",
    "string.min": "ism kamida 2 ta bulishi kerak"
  }),

  email: Joi.string().email().required().messages({
    "string.required": "email shart",
    "string.empty": "email bush bulish mumkin emas",
    "string.email": "email notugri kiritilgan",
  }),
  
  password: Joi.string().min(6).required().messages({
    "string.required": "password shart",
    "string.empty": "parol bush bulish mumkin emas",
    "string.min": "parol kamida 6 ta bulishi kerak"
  })
})