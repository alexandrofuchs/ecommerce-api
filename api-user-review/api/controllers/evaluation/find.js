const { isString } = require("lodash");
const Evaluation = require("../../models/Evaluation");
const { isValidEmail, isValidUUID } = require("../../validators");

module.exports = async function find(req, res) {
  try {
      const id = req.params.id

      const foundEvaluations = await Evaluation.find({ "product.id": id });
      return res.status(200).json({ data: foundEvaluations });
  } catch (error) {
    console.log(error)
    return res.badRequest({error })
  }
};
