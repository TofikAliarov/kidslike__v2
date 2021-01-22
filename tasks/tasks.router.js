const { Router } = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("./tasks.controller");
const { authorize } = require("../helpers/auth/token_verify");
const { asyncWrapper } = require("../helpers/wrapper_Try_Catch");
const { validate } = require("../helpers/validate");
const { createTaskSchema, updateTaskSchema } = require("./tasks.schemes");
const mongoose = require("mongoose");
const { TaskModel } = require("./tasks.model");

const router = Router();

router.param("taskId", async (req, res, next, taskId) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).send("Validation failed");
  }

  const task = await TaskModel.findById(taskId);
  if (!task) {
    return res.status(404).send("Task not found");
  }
  req.task = task;
  return next();
});

// CRUD

// 1. C - Create
router.post(
  "/",
  authorize,
  validate(createTaskSchema),
  asyncWrapper(createTask)
);

// 2. R - Read
router.get("/", authorize, asyncWrapper(getTasks));
router.get("/:taskId", authorize, asyncWrapper(getTaskById));

// // 3. U - Update
router.patch(
  "/:taskId",
  authorize,
  validate(updateTaskSchema),
  asyncWrapper(updateTask)
);

// 4. D - Delete
router.delete("/:taskId", authorize, asyncWrapper(deleteTask));

exports.tasksRouter = router;
