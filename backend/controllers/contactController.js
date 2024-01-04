const asyncHandler = require("express-async-handler");
const User = require("../modals/UserModel");
const sendEmail = require("../utils/sendEmail");


const contactController = asyncHandler(
    async (req, res) => {
        const { subject, message } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            res.status(404)
            throw new Error("User not found, Please signUp")
        }

        //validation
        if (!subject || !message) {
            res.status(400);
            throw new Error("please add subject and message")
        }


        const send_to = process.env.EMAIL_USER;
        const sent_from = process.env.EMAIL_USER;
        const reply_to = user.email;

        try {
            await sendEmail(subject, message, send_to, sent_from, reply_to);
            res.status(200).json({
                success: true,
                message: "Email Sent"
            })

        } catch (error) {
            res.status(500)
            throw new Error("Error while sending Email please try again");
        }


    }
)

module.exports = contactController;