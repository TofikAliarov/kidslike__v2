const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { validate } = require("../helpers/validate");
const { signUp, signIn, signOut, verifyEmail, googleAuth, googleRedirect } = require("./auth.controller");
const { UserSchemaForSignUp, UserSchemaForSignIn } = require("./auth.schemes");
const { authorize } = require("../helpers/auth/token_verify");
const { asyncWrapper } = require("../helpers/wrapper_Try_Catch");

const router = Router();

router.post("/signUp", validate(UserSchemaForSignUp), asyncWrapper(signUp));
router.post("/signIn", validate(UserSchemaForSignIn), asyncWrapper(signIn));
router.delete("/signOut", authorize, asyncWrapper(signOut));
router.get("/verify/:verificationToken", asyncWrapper(verifyEmail));

router.post("/google", asyncWrapper(googleAuth));
router.get("/googleRedirect", asyncWrapper(googleRedirect));

exports.authRouter = router;
