module.exports = department => {
    return function(req, res, next) {
        if(req.decodedJWT.department && req.decodedJWT.department.includes(department)) {
            next();
        } else {
            res.status(403).json({ message: "can't touch this" })
        }
    }
}