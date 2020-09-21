const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const workoutSchema = new Schema({
  day: {
    type: Date,
    default: () => new Date()
  },
  exercises: [{
    type:     { type: String },
    name:     { type: String },
    duration: { type: Number },
    weight:   { type: Number },
    reps:     { type: Number },
    sets:     { type: Number },
    distance: { type: Number }
  }]
},
  { toJSON: { virtuals: true } }
);

workoutSchema.virtual("totalDuration").get( function(){
    let result = 0;
    for(let i=0; i<this.exercises.length; i++){
      result += this.exercises[i].duration;
    }
    return result;
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;