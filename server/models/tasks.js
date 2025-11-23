let mongoose = require("mongoose");

//model creation

let tasksModel = mongoose.Schema({
    Title: String,
    Description: String,
    Date: Date,
    Priority: String,
    Status: String
    },

    {collection:"tasks"}

);

module.exports=mongoose.model('Tasks',tasksModel);