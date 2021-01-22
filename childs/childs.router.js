const { Router } = require("express");
const { authorize } = require("../helpers/auth/token_verify");
const { asyncWrapper } = require("../helpers/wrapper_Try_Catch");
const {
  createChild,
  getChildren,
  getChildById,
  updateChild,
  deleteChild,
} = require("./childs.controller");
const { validate } = require("../helpers/validate");
const { createChildSchema, updateChildSchema } = require("./childs.schemes");
const mongoose = require("mongoose");
const { ChildModel } = require("./childs.model");

const router = Router();

router.param("childId", async (req, res, next, childId) => {
  if (!mongoose.Types.ObjectId.isValid(childId)) {
    return res.status(400).send("Validation failed");
  }

  const child = await ChildModel.findById(childId);
  if (!child) {
    return res.status(404).send("Child not found");
  }
  req.child = child;
  return next();
});

// CRUD

// 1. C - Create
router.post(
  "/",
  authorize,
  validate(createChildSchema),
  asyncWrapper(createChild)
);

// 2. R - Read
router.get("/", authorize, asyncWrapper(getChildren));
router.get("/:childId", authorize, asyncWrapper(getChildById));

// // 3. U - Update
router.patch(
  "/:childId",
  authorize,
  validate(updateChildSchema),
  asyncWrapper(updateChild)
);

// 4. D - Delete
router.delete("/:childId", authorize, asyncWrapper(deleteChild));

exports.childsRouter = router;
