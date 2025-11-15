let mongoose = require("mongoose");

//model creation

let tasksModel = mongoose.Schema({
    Title: String,
    Description: String,
    Day: Number,
    Month: String,
    Year: Number,
    Priority: String,
    Status: String
    },

    {collection:"tasks"}

);

module.exports=mongoose.model('Tasks',tasksModel);