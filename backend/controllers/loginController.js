const asyncHandler = require("express-async-handler");
const User = require("../modals/UserModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("./registerController")



const loginController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // validate user
    if (!email || !password) {
        res.status(400);
        throw new Error("Please enter email and password");
    }
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("User Not Found, please SignUp");
    }
    //check credentials
    const correctPassword = await bcrypt.compare(password, user.password);

    const token = generateToken(user._id)

    //sending Http-Only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expiresIn: new Date(Date.now() + 1000 * 86400),//1 day
        sameSite: "none",
        secure: true
    });

    if (user && correctPassword) {
        const { _id, name, email, photo, phone, bio } = user
        res.status(200).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
            token
        });
    } else {
        res.status(400);
        throw new Error("Invalid email or password");
    }


})


module.exports = loginController;
