const asyncHandler = require("express-async-handler");
const Token = require("../modals/TokenModel")
const User = require("../modals/UserModel")
const crypto = require('crypto');
const sendEmail = require("../utils/sendEmail");

const resetPasswordController = asyncHandler(
    async (req, res) => {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404);
            throw new Error("User does not Exist")
        }
        //delete previously existed Token
        let existedToken = Token.findOne({ userId: user._id });
        if (existedToken) {
            await Token.deleteOne()
        }

        //create reset Token
        let resetToken = crypto.randomBytes(32).toString("hex") + user._id;


        //hash token before saving it to DB
        const hashedResetToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        // save Token To DB
        await new Token({
            userId: user._id,
            token: hashedResetToken,
            createdAt: Date.now(),
            expiresAt: Date.now() + 30 * (60 * 1000)
        }).save();

        //construct Reset Url
        const resetUrl = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`


        //reset Email
        const message = `
        <h2>Hello ${user.name}</h2>
        <p>Please use the url below to reset your Password</p>
        <p>the url will only be valid for 30minutes</p>

        <a href=${resetUrl} clicktracking=off
        >${resetUrl}</a>
        <p>Regards...</p>
        <p>INVENT Team</p>
        `;
        const subject = "Password reset request";
        const send_to = user.email;
        const sent_from = process.env.EMAIL_USER;

        try {
            await sendEmail(subject, message, send_to, sent_from);
            res.status(200).json({
                success: true,
                message: "Reset Email Sent"
            })

        } catch (error) {
            res.status(500)
            throw new Error("Error while sending Email please try again");
        }

    }
);


module.exports = resetPasswordController;