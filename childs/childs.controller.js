const { NotFound } = require("../helpers/errors/auth.errors");
const { UserModel } = require("../users/users.model");
const { ChildModel } = require("./childs.model");

exports.createChild = async (req, res, next) => {
  const newChild = await ChildModel.create({
    ...req.body,
    userId: req.user._id,
  });
  await UserModel.findByIdAndUpdate(req.user._id, {
    $push: { childId: newChild._id },
  });
  return res.status(201).send(newChild);
};

exports.getChildren = async (req, res, next) => {
  const { childId } = req.user;
  const children = await ChildModel.find({ _id: childId.map((el) => el) });
  // todo не будет работать [] = true
  if (!children.length) {
    throw new NotFound("You don't have a child yet.");
  }
  return res.status(200).send(children);
};

exports.getChildById = async (req, res, next) => {
  return res.status(200).send(req.child);
};

exports.updateChild = async (req, res, next) => {
  const { _id } = req.child;
  const updatedChild = await ChildModel.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  return res.status(200).send(updatedChild);
};

exports.deleteChild = async (req, res, next) => {
  const { _id } = req.child;
  await ChildModel.findByIdAndDelete(_id);
  await UserModel.findByIdAndUpdate(req.user._id, {
    $pull: { childId: _id },
  });
  return res.status(204).send();
};
