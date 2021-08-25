const { isValidUUID } = require("../helpers/validate")

module.exports = async (req, res, next) => {
    if (!isValidUUID(req.params.id)) {
        return res.status(400).json({ error: 'invalid Id' })
    }
    next()
}