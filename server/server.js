require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const userRoutes = require('./routes/user')

//express app
const app = express()

// Use CORS middleware
app.use(cors());

//Middlewares
app.use(express.json())

//logger to log routes in console
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

//user Routes
app.use('/api/user',userRoutes)

mongoose.connect(process.env.MONGO_URI)
 .then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('connected to db & listening on port',process.env.PORT)
    })
 })
 .catch ((error)=>{
    console.log(error)
 })
