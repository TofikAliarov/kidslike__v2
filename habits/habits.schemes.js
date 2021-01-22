const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.createHabitSchema = Joi.object({
  name: Joi.string().required(),
  childId: Joi.objectId().required(),
  points: Joi.number().required(),
  isCompleted: Joi.boolean(),
  daysToComplete: Joi.array().length(10)
});

exports.updateHabitSchema = Joi.object({
  name: Joi.string(),
  childId: Joi.objectId(),
  points: Joi.number(),
  daysToComplete: Joi.array().length(10),
  isCompleted: Joi.boolean(),
}).min(1);

exports.checkHabitSchema = Joi.object({
  date: Joi.string().required(),
  done: Joi.string().required(),
})