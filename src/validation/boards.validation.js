import Joi from "joi"

export const boardsValidation = Joi.object({
  title: Joi.string().min(2).required().messages({
    "string.empty": "title bush bulish mimkin emas",
    "string.min": "title kamida 2 ta bulishi kerak"
  }),

  columns: Joi.string().min(2).required().messages({
    "string.required": "columns shart",
    "string.empty": "columns bush bulish mumkin emas",
    "string.min": "columns kamida 2 ta bulishi kerak"
  })
})
