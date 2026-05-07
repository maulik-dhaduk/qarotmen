const jwt = require("jsonwebtoken");

const auth = (req,res,next) => {
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.send("token missing")
    }
    const token = authHeader.split(" ")[1]
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()

    } catch (err){
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Admin only." });
    }
}

module.exports = auth;
module.exports.isAdmin = isAdmin;
