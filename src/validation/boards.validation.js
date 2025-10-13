// src/validation/boards.validation.js
import Joi from 'joi'

export const createBoardSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional().allow('', null),
  userId: Joi.number().integer().positive().required()
})

export const updateBoardSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  description: Joi.string().max(500).optional().allow('', null)
}).min(1)