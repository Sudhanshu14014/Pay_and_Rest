const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.connect("mongodb://localhost:27017/PayAndRest", {
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));
const app = express();
const port = 8080;

const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");

const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));
// app.use(express.static(path.resolve(__dirname, 'public')))

app.get("/", (req, res) => {
    res.send("hello");
});

app.post("/api/signup", signupRouter);
app.post("/api/login", loginRouter);

app.get("/api", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({ message: "Hello from servers" });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
