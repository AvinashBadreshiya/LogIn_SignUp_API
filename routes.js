const express = require('express')
const app = express()

const userRouter = require('./routes/userInfoRouter')

app.use('/user',userRouter)

module.exports = app