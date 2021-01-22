const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.createTaskSchema = Joi.object({
  name: Joi.string().required(),
  points: Joi.number().required(),
  isCompleted: Joi.string(),
  daysToComplete: Joi.number(),
  childId: Joi.objectId().required(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

exports.updateTaskSchema = Joi.object({
  name: Joi.string(),
  points: Joi.number(),
  isCompleted: Joi.string(),
  daysToComplete: Joi.number(),
  childId: Joi.objectId(),
  createdAt: Joi.date(),
  updatedAt:Joi.date()
}).min(1);

exports.validateIdSchema = Joi.object({
  id: Joi.objectId(),
});
