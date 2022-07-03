module.exports = async function (req, res, next) {
    try {
        if(!!req.user){
            if(!!req.user.isAdmin){
                return next();
            }
        }
        return res.status(401).json({ error: 'unauthorized!'})
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Server Error!" });
    }
}