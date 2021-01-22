const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const AVATAR_PATH = `${process.env.DOMAIN_ADDRESS}/images/defAvatars.svg`;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    tokens: [{ type: String }],
    verificationToken: { type: String },
    avatarURL: { type: String, default: AVATAR_PATH },
    childId: [{ type: ObjectId, unique: true }],
  },
  {
    timestamps: true,
  }
);

exports.UserModel = mongoose.model("User", UserSchema);
