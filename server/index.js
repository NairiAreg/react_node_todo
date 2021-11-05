const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const taskRoute = require('./routes/tasks')
const taskListRoute = require('./routes/tasklists')
dotenv.config()

//! Import routes
const authRoute = require('./routes/auth')

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true
}, () => console.log("db connected"))


//! Middleware
app.use(express.json())
app.use(cors())
//! Route middleware
app.use('/api/user', authRoute)
app.use('/api/tasks', taskRoute)
app.use('/api/tasklists', taskListRoute)
app.listen(3000, () => console.log('Server working'))