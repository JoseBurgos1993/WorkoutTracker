const router = require("express").Router();
const Transaction = require("../models/Workout.js");

router.get("/", (req,res) => {
    console.log("We are here");
});

module.exports = router;