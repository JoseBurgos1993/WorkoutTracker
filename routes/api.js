const router = require("express").Router();
const mongojs = require("mongojs");
const db = require("../models");
//const Workout = require("../models/workout.js");

    /*
        get last workout => "/api/workouts"
        add exercise => "/api/workouts/" + id
        create workout => "/api/workouts"
        get workouts in range => `/api/workouts/range` WHAT DOES THAT MEAN
    */
router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});
router.put("/api/workouts/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log("type of req.body => ", typeof req.body);
    console.log("req.body => ", req.body);

    db.Exercise.create(body)
        .then( ({_id}) => db.Workout.findOneAndUpdate( {}, { $push: {exercises: _id}}))
        .then(dbWorkout => {
            res.json(dbWorkout);
          })
          .catch(err => {
            res.json(err);
          });
    /*
    db.Workout.find({_id: mongojs.ObjectId(id)})
        .update({$push: {exercises: body}})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
        */
    /*
    db.Workout.updateOne( {_id: mongojs.ObjectId(id)}, { $set: { exercises: body}}, (error, data) => {
        console.log("IS THIS FUCKING WORKING?");
        if(error){
            console.log("ERROR",error);
            res.send(error);
        } else{
            console.log("NOT ERROR");
            res.send(data);
        }
    });
        */
    /*
    db.Workout.findByIdAndUpdate(id, { $push: { exercises: body}}, done)
        .then(dbWorkout => {
            console.log("dbWorkout", dbWorkout);
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });*/
});
router.post("/api/workouts", (req, res) => {
    //const workout = new db.Workout(req.body);
    db.Workout.create(req.body, (error, data) => {
        if(error){
            res.send(error);
        } else{
            res.send(data);
        }
    });
    /*
    db.Workout.create(workout)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });*/
});
router.get("/api/workouts/range", (req, res) => {
    console.log("This is when RANGE is used");
    db.Workout.find({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

module.exports = router;
