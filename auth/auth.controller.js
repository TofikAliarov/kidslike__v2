// const { MoveFile } = require('../server/helpers/moveFiles');
// const { asyncWrapper } = require('../server/helpers/async-wrapper');
// const { avatarGenerate } = require('../server/helpers/avatar-generator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const axios = require("axios");
const queryString = require("query-string");
const {
  Conflict,
  NotFound,
  Unauthorized,
  Unverify,
} = require("../helpers/errors/auth.errors");
const { UserModel, UserModelGoogle } = require("../users/users.model");
const { mailing } = require("../helpers/auth/mailing");
const { serializeUser } = require("../users/users.serializer");
const { sendVerificationEmail2 } = require("../helpers/auth/mailing2");

exports.signUp = async (req, res, next) => {
  const { email, password, username } = req.body;
  const existing = await UserModel.findOne({ email });
  if (existing) {
    throw new Conflict("Email already exists");
  }
  // const avatar = await avatarGenerate();
  const passwordHash = await bcrypt.hash(password, +process.env.SALT_ROUNDS);

  const user = await UserModel.create({
    email,
    passwordHash,
    username,
    // avatarURL:`${process.env.DOMAIN_ADDRESS}/images/${avatar}`,
    verificationToken: uuid.v4(),
  });
  await sendVerificationEmail2(user);
  const some = mailing.sendEmailForVarification(user);
  if (some) return res.status(201).send(serializeUser(user));
};

exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const existing = await UserModel.findOne({ email });

  if (!existing) {
    throw new NotFound("User with such email doesnt exists");
  }
  if (existing.verificationToken !== null) {
    throw new Unverify("Please verify your email");
  }
  const validPassword = await bcrypt.compare(password, existing.passwordHash);
  if (!validPassword) {
    throw new Unauthorized("Email or password is wrong");
  }
  const token = jwt.sign({ userID: existing._id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
  const user = await UserModel.findByIdAndUpdate(existing._id, {
    $push: { tokens: token },
  });
  return res.status(201).send({
    token,
    user: serializeUser(user),
  });
};

exports.signOut = async (req, res, next) => {
  const { user, token } = req;
  await UserModel.updateOne(
    { _id: user._id },
    {
      $pull: { tokens: token },
    }
  );
  return res.status(204).send();
};

exports.verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await UserModel.findOne({ verificationToken });
  if (!user) {
    throw new NotFound("User not found or email is already varifed");
  }
  await UserModel.updateOne({ _id: user._id }, { verificationToken: null });
  return res.status(200).send("Varification was successful");
  // return res.redirect(`${process.env.CLIENT_URL}/verification`);
};

exports.googleAuth = async (req, res, next) => {
  const { email, name, picture, id } = req.body;
  let existing = await UserModel.findOne({ email });
  const passwordHash = await bcrypt.hash(id, +process.env.SALT_ROUNDS);
  let user;
  if (!existing) {
    user = await UserModel.create({
      email,
      passwordHash,
      username: `${name}`,
      avatarURL: `${picture}`,
      verificationToken: null,
    });
  } else {
    const validPassword = await bcrypt.compare(id, existing.passwordHash);
    if (!validPassword) {
      throw new Unauthorized("You must register");
    }
  }
  existing = await UserModel.findOne({ email });
  const token = jwt.sign({ userID: existing._id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
  user = await UserModel.findByIdAndUpdate(existing._id, {
    $push: { tokens: token },
  });
  return res.status(201).send({
    token,
    user: serializeUser(user),
  });
};

exports.googleRedirect = async (req, res) => {};
