const { TestModel } = require("./tests.model");

exports.createTest = async (req, res, next) => {
  try {
    const newTest = await TestModel.create(req.body);

    return res.status(201).send(newTest);
  } catch (err) {
    next(err);
  }
};

exports.getTests = async (req, res, next) => {
  try {
    const tests = await TestModel.find();
    return res.status(200).send(tests);
  } catch (err) {
    next(err);
  }
};

exports.deleteTest = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteTest = await TestModel.findByIdAndDelete(id);
    if (!deleteTest) {
      return res.status(404).send("SomeName not found");
    }
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};
