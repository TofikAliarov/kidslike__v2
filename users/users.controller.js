const { serializeUser } = require("./users.serializer");

exports.getCurretUser = (req, res, next) => {
  return res.status(200).send(serializeUser(req.user));
};
