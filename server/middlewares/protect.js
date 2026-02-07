const jwt = require("jsonwebtoken")

const protect = (req, res, next) => {
    // check for cookie
    const ADMIN = req.cookies.ADMIN

    // if not send err
    // admin me token hai
    if (!ADMIN) {
        return res.status(401).json({ message: "no cookie found", success: false })
    }

    // check for token
    // if not send arr

    // if verify // 1 st arg - jwt data, 2nd arg - payload {obj} from auth.controller jwt.sign    decode
    jwt.verify(ADMIN, process.env.JWT_KEY, (data, decode) => {
        if (!decode) {
            return res.status(401).json({ message: "invalid token", success: false })
        }
        next()
    })
    // if everyting is available call next func
}

module.exports = protect