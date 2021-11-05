const mongoose = require('mongoose')

const taskListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    theme: {
        type: String,
        required: false,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('TaskList', taskListSchema)



