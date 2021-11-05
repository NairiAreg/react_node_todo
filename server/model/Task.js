const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        min: 6,
        max: 50
    },
    important: {
        type: Boolean,
        required: true,
        default: false
    },
    task_list: {
        type: String,
        required: false
    },
    note: {
        type: String,
        max: 500,
        required: false
    },
    repeat: {
        type: Number,
        max: 365,
        required: false
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    due_date: {
        type: Date,
        required: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Task', taskSchema)



