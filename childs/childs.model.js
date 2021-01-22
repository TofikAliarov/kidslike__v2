const mongoose = require("mongoose");
const { Schema } = mongoose;

const childSchema = new Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    points: { type: Number, required: false, default: 0 },
    userId: { type: mongoose.ObjectId, required: false },
  },
  {
    timestamps: true,
  }
);

exports.ChildModel = mongoose.model("Child", childSchema);
