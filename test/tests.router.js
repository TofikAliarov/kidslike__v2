const { Router } = require("express");
const { createTest, getTests, deleteTest } = require("./tests.controller");

const router = Router();

// CRUD

// 1. C - Create
router.post("/", createTest);

// 2. R - Read
router.get("/", getTests);

// // 3. U - Update

// 4. D - Delete
router.delete("/:id", deleteTest);

exports.testsRouter = router;
