const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// exports.validateIdSchema = Joi.object({
//   contactId: Joi.objectId(),
// });

exports.UserSchemaForSignUp = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  username: Joi.string().required(),
});

exports.UserSchemaForSignIn = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

// exports.UpdateSubUser = Joi.object({
//   subscription: Joi.string().valid("free", "pro", "premium").required()
// })

// exports.UpdateAvatarUser = Joi.object({
//   avatar: Joi.string(),
// })
