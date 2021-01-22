const jwt = require("jsonwebtoken");
const { UserModel } = require("../../users/users.model");
const { Unauthorized } = require("../errors/auth.errors");

exports.authorize = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Unauthorized("Token is not valid");
    }
    const user = await UserModel.findOne({
      _id: payload.userID,
      tokens: token,
    });
    if (!user) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    next(err);
  }
};
