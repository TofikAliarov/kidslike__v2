const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.createChildSchema = Joi.object({
  name: Joi.string().required(),
  gender: Joi.string().required(),
  userId: Joi.objectId(),
});

exports.updateChildSchema = Joi.object({
  name: Joi.string(),
  points: Joi.number(),
  gender: Joi.string(),
}).min(1);
