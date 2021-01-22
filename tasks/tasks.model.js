const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    name: { type: String, required: true },
    points: { type: Number, required: true },
    isCompleted: { type: String, required: false, default: "inProgress" },
    daysToComplete: { type: Number, required: false, default: 0 },
    childId: { type: ObjectID, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {}
);

exports.TaskModel = mongoose.model("Task", taskSchema);
