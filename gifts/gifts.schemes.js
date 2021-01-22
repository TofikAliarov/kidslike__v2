const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.createGiftSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  imageUrl: Joi.string(),
  childId: Joi.objectId().required(),
});

exports.purchaseGiftSchema = Joi.object({
  price: Joi.number().required(),
  childId: Joi.objectId().required(),
})
