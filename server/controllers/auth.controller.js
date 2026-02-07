const User = require("../models/User.js");

const bcrypt = require("bcryptjs");
// npm i bcrypt js -  password : encrypt (convert to strig)
// 10 - salt , more big no strong password

const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    try {
        const { password, email } = req.body

        // check if email exist , if exist err    if not then run following code
        // arg in obj form
        // find - arr, findone - returns obj , if findone doesn't find data returns null
        const data = await User.findOne({ email })
        if (data) {
            return res.status(409).json({ message: "email already exist", success: false })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        // console.log(hashPassword)
        // console.log(password)

        // email, name - req.body
        await User.create({ ...req.body, password: hashPassword })
        res.status(201).json({ message: "user register success" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message, success: false })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        // 1 check if email exist in db
        const data = await (User.findOne({ email })) // if found returns obj with all fields

        // 2 if not - error
        if (!data) {
            return res.status(401).json({ message: "email not found", success: false })
        }

        // 3 compare password
        const isValid = await bcrypt.compare(password, data.password)  // returns boolean value

        // 4 if password do not match - send err
        if (!isValid) {
            return res.status(401).json({ message: "invalid password", success: false })
        }

        // 5 if user isactive false send err
        if (!data.isActive) {
            return res.status(401).json({ message: "account blocked by admin", success: false })
        }

        // 6 password match - login success

        // jwt tooken , // token is simply string, who is login is saved in token
        // 1st arguent - payload , 2 - jwt password, 3 - {} how many time it is valid
        const token = jwt.sign({ _id: data.id, name: data.name }, process.env.JWT_KEY, { expiresIn: "1d" })

        // access token & refresh token

        // send secure cookie,             cookie name , 2nd arg - what to send, 3rd - how many time
        // 1 sec 1000 ms                      1 min
        res.cookie("ADMIN", token, {
            maxAge: 1000 * 60,
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true
        })

        res.status(200).json({
            message: "user login success",
            data: { name: data.name, email: data.email },
            // token (not recommended)
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message, success: false })
    }
}

exports.logout = async (req, res) => {
    try {
        // dlt cookie
        res.clearCookie("ADMIN")
        res.status(200).json({ message: "user logout success" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message, success: false })
    }
}

