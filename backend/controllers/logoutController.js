const asyncHandler = require("express-async-handler");
const User = require("../modals/UserModel");


const logoutController = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expiresIn: new Date(0),//1 day
        sameSite: "none",
        secure: true
    });

    return res.status(200).json({ message: "Successfully Logged Out" });
});


module.exports = logoutController