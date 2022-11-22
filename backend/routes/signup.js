const express = require("express");
const router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/PayAndRest", {
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose-signup"));

router.post("/api/signup", async (req, res) => {
    const user = new User(req.body);
    const query = { $or: [{ contact: user.contact }, { email: user.email }] };

    db.collection("users")
        .find(query)
        .toArray(function (err, result) {
            if (err) throw err;
            if (result.length === 0) {
                try {
                    user.save();
                    console.log("Data stored");
                    res.status(200).send(user);
                } catch (err) {
                    console.log("nope");
                    res.status(500).send(err);
                }
            } else {
                if (result[0].contact === user.contact) {
                    res.status(209).send(
                        `${user.contact} is already signed up`
                    );
                } else if (result[0].email === user.email) {
                    res.status(209).send(`${user.email} is already signed up`);
                } else {
                    try {
                        user.save();
                        console.log("Data stored");
                        res.status(200).send(user);
                    } catch (err) {
                        console.log("nope");
                        res.status(500).send(err);
                    }
                }
            }
        });
    // db.collection("users")
    //     .find(query2)
    //     .toArray(function (err, result) {
    //         if (err) throw err;
    //         if (result[0].email === user.email) {
    //             res.send(` ${user.email} is already signed up`);
    //         } else {
    //             try {
    //                 user.save();
    //                 console.log("Data stored");
    //                 res.status(200).send(user);
    //             } catch (err) {
    //                 console.log("nope");
    //                 res.status(500).send(err);
    //             }
    //         }
    //     });
});

module.exports = router;
