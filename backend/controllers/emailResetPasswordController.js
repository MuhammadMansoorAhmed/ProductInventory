const asyncHandler = require('express-async-handler');
const Token = require('../modals/TokenModel');
const User = require('../modals/UserModel');
const crypto = require('crypto');

const emailResetPasswordController = asyncHandler(
    async (req, res) => {

        const { password } = req.body;
        const { resetToken } = req.params;

        //hash token to compare with the one saved in the DB
        const hashedResetToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");


        // finding to in DB
        const userToken = await Token.findOne({
            token: hashedResetToken,
            expiresAt: { $gt: Date.now() }
        });

        if (!userToken) {
            res.status(404);
            throw new Error("Invalid or Expired Token")
        }

        //find User
        const user = await User.findOne({ _id: userToken.userId })
        user.password = password;

        await user.save();
        res.status(200).json({ message: "password reset Successful" });

    }
);

module.exports = emailResetPasswordController