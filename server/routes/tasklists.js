const router = require('express').Router()
const verify = require('./verifyToken')
const TaskList = require('../model/TaskList')
const Task = require('../model/Task')
//! Create TaskList
router.post('/', verify, async (req, res) => {
    console.log("🐱‍🏍🐱‍🏍", req.body, "🐱‍🏍🐱‍🏍")
    const task = new TaskList({
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

//! Get TaskLists
router.get('/', verify, (req, res) => {
    // console.log("🐱‍🏍🐱‍🏍",req.user._id,"🐱‍🏍🐱‍🏍")
    const taskList = TaskList.find({}, (err, data) => {
        if (err) res.status(400).send("Error: " + err)
        res.send(data)
    })
    console.log("❤❤", taskList, "❤❤")
})
//! Update TaskLists
router.put('/:taskListId', verify, async (req, res) => {
    console.log("🐱‍🏍🐱‍🏍", req.params.taskListId, "🐱‍🏍🐱‍🏍")
    TaskList.findByIdAndUpdate(req.params.taskListId,req.body, (err, data) => {
        if (err) res.status(400).send("Error: " + err)
       res.send(data)
    })
})

//! Delete TaskLists
router.delete('/:taskListId', verify, async (req, res) => {
    console.log("🐱‍🏍🐱‍🏍", req.params.taskListId, "🐱‍🏍🐱‍🏍")
    TaskList.findByIdAndRemove(req.params.taskListId, (err, data) => {
        if (err) res.status(400).send("Error: " + err)
        Task.deleteMany({
            task_list: req.params.taskListId
        }, function (err, result) {

            if (err) {

                console.log("error query");

            } else {

                console.log(result);
                res.send(result)

            }

        });
    })
})

module.exports = router