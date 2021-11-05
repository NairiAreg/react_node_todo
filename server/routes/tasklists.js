const router = require('express').Router()
const verify = require('./verifyToken')
const Task = require('../model/TaskList')
//! Create Task List
router.post('/', verify, async (req, res) => {
    console.log("🐱‍🏍🐱‍🏍", req.body, "🐱‍🏍🐱‍🏍")
    const task = new Task({
        title: req.body.title,
        theme: req.body.theme,
    })
    console.log("❤❤", task, "❤❤")
    try {
        const savedTask = await task.save()
        res.send(savedTask)
    } catch (err) {
        res.status(400).send("Error: " + err)
    }
})

//! Get Task Lists
router.get('/', verify, async (req, res) => {
    console.log("🐱‍🏍🐱‍🏍",req.user._id,"🐱‍🏍🐱‍🏍")
    const taskList = Task.find({}, (err, data) => {
        if (err) res.status(400).send("Error: " + err)
        res.send(data)
    })
    console.log("❤❤", taskList, "❤❤")
})

module.exports = router