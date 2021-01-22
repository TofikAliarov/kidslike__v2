const mongoose = require("mongoose");
const { Schema } = mongoose;

const habitSchema = new Schema(
  {
    name: { type: String, required: true },
    points: { type: Number, required: true },
    daysToComplete: {
      type: Array, required: true
    },
    childId: { type: mongoose.ObjectId, required: true },
    isCompleted: { type: Boolean, default: null },
  },
  {
    timestamps: true,
  }
);

exports.HabitModel = mongoose.model("Habit", habitSchema);
