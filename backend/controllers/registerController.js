const asyncHandler = require("express-async-handler");
const User = require("../modals/UserModel");
const jwt = require("jsonwebtoken")

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
}

const registerController = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    //field validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all required fields")
    }
    if (password.length < 6 || password.length > 23) {
        res.status(400)
        throw new Error("Password must be greater than 6 characters")
    }
    // check if user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error("Email Already Exist")
    }


    // create new User
    const newUser = await User.create({
        name,
        email,
        password,
    });
    // generate Token
    const token = generateToken(newUser._id);

    //sending Http-Only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expiresIn: new Date(Date.now() + 1000 * 86400),//1 day
        sameSite: "none",
        secure: true
    });

    if (newUser) {
        const { _id, name, email, photo, phone, bio } = newUser
        res.status(201).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
            token
        });
    } else {
        res.status(400)
        throw new Error("invalid User Data")
    }


})


module.exports = { registerController, generateToken } 