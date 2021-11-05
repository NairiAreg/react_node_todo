const router = require('express').Router()
const verify = require('./verifyToken')
const Task = require('../model/Task')

//! Create Task
router.post('/', verify, async (req, res) => {
    console.log("🐱‍🏍🐱‍🏍", req.body, "🐱‍🏍🐱‍🏍")
    const task = new Task({
        user_id: req.body.user_id,
        title: req.body.title,
        important: req.body.important,
        task_list: req.body.task_list,
        note: req.body.note,
        repeat: req.body.repeat,
        completed: req.body.completed,
        due_date: req.body.due_date
    })
    console.log("❤❤", task, "❤❤")
    try {
        const savedTask = await task.save()
        res.send(savedTask)
    } catch (err) {
        res.status(400).send("Error: " + err)
    }
})

//! Read (Get) Tasks
router.get('/', verify, async (req, res) => {
    // console.log("🐱‍🏍🐱‍🏍",req.user._id,"🐱‍🏍🐱‍🏍")
    const task = Task.find({
        user_id: req.user._id
    }, (err, data) => {
        if (err) res.status(400).send("Error: " + err)
        res.send(data)
    })
    // console.log("❤❤", task, "❤❤")
})

//! Update Task
router.put('/:taskId', verify, async (req, res) => {
    console.log("🐱‍🏍🐱‍🏍", req.body, req.params, req.params.taskId, "🐱‍🏍🐱‍🏍")
    await Task.findOneAndUpdate({
        "_id": req.params.taskId
    }, req.body);
    // console.log("❤❤", task, "❤❤")
    res.send("Updated")
})

//! Delete Task
router.delete('/:taskId', verify, async (req, res) => {
    console.log("🐱‍🏍🐱‍🏍", req.body, req.params, req.params.taskId, "🐱‍🏍🐱‍🏍")
    await Task.findOneAndDelete({
        "_id": req.params.taskId
    });
    // console.log("❤❤", task, "❤❤")
    res.send("Deleted")
})



module.exports = router