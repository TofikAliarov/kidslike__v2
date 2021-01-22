const { HabitModel } = require("./habits.model");
const { ChildModel } = require("../childs/childs.model");
const moment = require('moment');

function daysToCompleteExample(length) {
  let array = [];
  for (let i = 0; i < length; i++) {
    let day = { date: moment().add(i, 'days').toISOString().slice(0, 10), done: null }
    array.push(day);
  }
  return array;
}

exports.createHabit = async (req, res, next) => {
  const days = daysToCompleteExample(10);
  const newHabit = await HabitModel.create({ daysToComplete: days, ...req.body, });
  return res.status(201).send(newHabit);
};

exports.getHabits = async (req, res, next) => {
  const { childId } = req.user;
  const habits = await HabitModel.find({ childId: childId });
  return res.status(200).send(habits);
};

// exports.getHabitById = async (req, res, next) => {
//   const { _id } = req.habit;
//   const habit = await HabitModel.find({ _id });
//   return res.status(200).send(habit);
// };

exports.updateHabit = async (req, res, next) => {
  const { _id } = req.habit;
  const updatedHabit = await HabitModel.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  return res.status(200).send(updatedHabit);
};

exports.checkHabitDone = async (req, res, next) => {
  const { _id, childId, points } = req.habit;
  const { done } = req.body;
  const pointsToAdd = done === "yes" ? points : 0;
  const habitToCheck = await HabitModel.findOneAndUpdate(
    { _id, "daysToComplete.date": req.body.date },
    { $set: { "daysToComplete.$.done": req.body.done } },
    {
      new: true,
    }
  );
  const allUpdatedHabitDays = await HabitModel.findOne({ _id }).select(
    "daysToComplete -_id"
  );
  const doneDays = await allUpdatedHabitDays.daysToComplete.map(
    (el) => el.done
  );
  const successPointsToAdd = (points * 10) / 2 + points;
  if (doneDays.every((el) => el === "yes")) {
    await ChildModel.findByIdAndUpdate(
      { _id: childId },
      { $inc: { points: successPointsToAdd } }
    );
    await HabitModel.findByIdAndUpdate(
      { _id },
      { $set: { isCompleted: true } }
    );
  } else if (!doneDays.some((el) => el === null)) {
    await ChildModel.findByIdAndUpdate(
      { _id: childId },
      { $inc: { points: pointsToAdd } }
    );
    await HabitModel.findByIdAndUpdate(
      { _id },
      { $set: { isCompleted: true } }
    );
  } else {
    await ChildModel.findByIdAndUpdate(
      { _id: childId },
      { $inc: { points: pointsToAdd } }
    );
  }

  return res.status(200).send(habitToCheck);
};

exports.deleteHabit = async (req, res, next) => {
  const { _id } = req.habit;
  await HabitModel.findByIdAndDelete(_id);

  return res.status(204).send(_id);
};
