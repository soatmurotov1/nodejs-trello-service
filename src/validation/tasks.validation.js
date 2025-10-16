import Joi from "joi"


export const tasksValidation = Joi.object({
  title: Joi.string().min(2).required().messages({
    "string.required": "title shart",
    "string.base": "title matn bulishi kerak",
    "string.empty": "title bush bulish mumkin emas",
    "string.min": "title kamida 2 ta bulishi kerak"
  }),
  descriptionn: Joi.string().allow("").messages({
    "string.base": "descriptionn matn bulishi kerak"
  }),
  orderr: Joi.number().integer().required().messages({
    "any.required": "orderr shart",
    "number.base": "orderr son bulishi kerak",
    "number.integer": "orderr butun son bulishi kerak"
  }),
  userId: Joi.number().integer().required().messages({
    "any.required": "userId shart",
    "number.base": "userId son bulishi kerak"
  }),
  boardId: Joi.number().integer().required().messages({
    "any.required": "boardId shart",
    "number.base": "boardId raqam bulishi kerak"
  }),
  columnId: Joi.number().integer().required().messages({
    "any.required": "columnId shart",
    "number.base": "columnId son bulishi kerak"
  })
})



export const updateValidation = Joi.object({
  title: Joi.string().min(2).messages({
    "string.base": "title matn bulishi kerak",
    "string.empty": "title bush bulish mumkin emas",
    "string.min": "title kamida 2 ta bulishi kerak"
  }),
  descriptionn: Joi.string().allow("").messages({
    "string.base": "descriptionn matn bulishi kerak"
  }),
  orderr: Joi.number().integer().messages({
    "number.base": "orderr son bulishi kerak",
    "number.integer": "orderr butun son bulishi kerak"
  }),
  userId: Joi.number().integer().messages({
    "number.base": "userId son bulishi kerak"
  }),
  boardId: Joi.number().integer().messages({
    "number.base": "boardId raqam bulishi kerak"
  }),
  columnId: Joi.number().integer().messages({
    "number.base": "columnId son bulishi kerak"
  })
})
