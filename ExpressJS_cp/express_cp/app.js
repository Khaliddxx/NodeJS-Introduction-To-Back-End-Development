require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const usersRouter = require("./routes/users");
const homePage = require("./routes/home");
const ourServices = require("./routes/services");
const contactUs = require("./routes/contact");
const productRouter = require("./routes/products");

console.log(process.env.CONNECTION_STRING);

mongoose.connect(
    process.env.CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => console.log("Database is connected")
);

const app = express();

// custom middleware
const isValid = (req, res, ahmed) => {
    const date = new Date();
    const day = date.getDay(); // 0 -> 6 , 0 is Sunday
    const hours = date.getHours(); // 0 --> 23

    req.ahmed = "ahmed message";
    if (day >= 0 && day <= 4 && hours >= 9 && hours <= 17) {
        ahmed();
    } else {
        res.send("Server is out of service");
    }
};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.set("views", "./views");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", isValid);
app.use("/", homePage);
app.use("/services", ourServices);
app.use("/users", usersRouter);
app.use("/contact", contactUs);
app.use("/products", productRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
