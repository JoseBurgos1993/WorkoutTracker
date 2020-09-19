const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/", (req,res) => {
    console.log("We are here");
});

module.exports = router;