require("dotenv").config();
const express = require("express")
const DbConnect = require("./config/DBConnect");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorMiddleware")
const cookieParser = require("cookie-parser");
const path = require('path');
const cors = require('cors');


const app = express();

const PORT = process.env.PORT || 3500

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: [process.env.OriginRoute],
    credentials: true
}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

//User Routes
app.use('/', require('./routes/HomeRoute'))
app.use('/api/users', require("./routes/userRegister"))
app.use('/api/users', require("./routes/UserLogin"))
app.use('/api/users', require("./routes/userLogout"))
app.use('/api/users', require("./routes/loggedInStatus"))
app.use('/api/users', require("./routes/getUserRoute"))
app.use('/api/users', require("./routes/userUpdateRoute"))
app.use('/api/users', require("./routes/changePasswordRoute"))
app.use('/api/users', require("./routes/resetPasswordRoute"))
app.use('/api/users', require("./routes/emailResetPasswordRoute"))
//Product Routes
app.use('/api/product', require("./routes/productRoute"))
app.use('/api/product', require("./routes/getAllProducts"))
app.use('/api/product', require("./routes/getSingleProduct"))
app.use('/api/product', require("./routes/deleteProductRoute"))
app.use('/api/product', require("./routes/updateProductRoute"))
//contact Route
app.use('/api/contact', require("./routes/contactRoute"))

// Error middleware
app.use(errorHandler);

DbConnect();
app.listen(PORT, () => {
    console.log(`Backend server Connected to port ${PORT}`);
})
