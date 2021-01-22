
const { Router } = require("express");
const { authorize } = require("../helpers/auth/token_verify");
const { asyncWrapper } = require("../helpers/wrapper_Try_Catch");

const { getCurretUser } = require("./users.controller");


const router = Router();
router.get("/current", authorize, asyncWrapper(getCurretUser));


exports.userRouter = router;
