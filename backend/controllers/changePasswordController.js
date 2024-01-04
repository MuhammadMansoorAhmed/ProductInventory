const asyncHandler = require("express-async-handler");
const User = require("../modals/UserModel");
const bcrypt = require("bcrypt")

const changePasswordController = asyncHandler(
    async (req, res) => {
        const user = await User.findById(req.user._id);

        const { oldPassword, newPassword } = req.body;
        if (!user) {
            res.status(400);
            throw new Error("user not found, please signUp")
        }

        if (!oldPassword || !newPassword) {
            res.status(400);
            throw new Error("please add old and new Password")
        }
        // check if oldPassword is correct
        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

        // save new Password
        if (user && isPasswordCorrect) {
            user.password = newPassword;
            await user.save();
            res.status(200).json(
                { message: "Password Changed Successfully" }
            )
        } else {
            res.status(400);
            throw new Error("Old Password is incorrect!")
        }

    }
)


module.exports = changePasswordController

