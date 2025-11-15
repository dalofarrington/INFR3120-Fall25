let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Tasks = require('../models/tasks');

//CRUD operations
//Read
router.get('/',async(req,res,next)=>{
    try
    {
        const TaskList = await Tasks.find();
        //console.log(TasksList);
        res.render('Tasks/list',{
            title:'Tasks',
            TaskList:TaskList
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Tasks/list',{
            error:'Error on server'
        })
    }
})

//Create - Get Route
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Tasks/add',{
            title:'Add a Task'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Tasks/add',{
            error:'Error on server'
        })
    }
})

//Create - Post Route
router.post('/add',async(req,res,next)=>{
    try
    {
       
        let newTask = {
            Title: req.body.title,
            Description: req.body.description,
            Day: req.body.day,
            Month: req.body.month,
            Year: req.body.year,
            Priority: req.body.priority,
            Status: req.body.status
        };

        await Tasks.create(newTask);
        res.redirect('/tasks');
    }
    catch(err)
    {
        console.error(err);
        res.render('Tasks/add',{
            error:'Error on server'
        })
    }
})

// Update - Get Route
router.get('/edit/:id',async(req,res,next)=>{

})
// Update - Post Route
router.post('/edit/:id',async(req,res,next)=>{

})
// Delete
router.get('/delete/:id',async(req,res,next)=>{

})

module.exports = router;