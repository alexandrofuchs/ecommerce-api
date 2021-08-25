const { isString } = require("lodash");
const Evaluation = require("../../models/Evaluation");
const { isValidEmail, isValidUUID } = require("../../validators");

module.exports = async function create(req, res) {
  try {
    const { user, product, grade, title, description } = req.body;


    if(      
        !(_.inRange(_.toString(title).length, 3, 50))
      | !(_.inRange(_.toString(description).length, 3, 200)) 
      | !isValidEmail(user.email) 
      | !isValidUUID(product.id) )
    {
      return res.badRequest({ error: 'invalid values!' })
    }    

    if (!_.isInteger(grade) | !_.inRange(grade, 1, 6)){
      return res.badRequest({ error: 'grade must be between 1-5!' })
    }    

    if( await Evaluation.findOne({ user, product })){
      return res.badRequest({ error: 'product already evaluated by user!'});
    }

    const instance = new Evaluation ({ user, product, grade, title, description });
    const evaluation = await Evaluation.create(instance);    

    return res.json({ data: evaluation })
  } catch (error) {
    console.log(error)
    return res.badRequest({error })
  }
};
