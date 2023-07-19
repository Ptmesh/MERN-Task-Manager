const express = require('express');
const app=express();
const tasks=require('./routes/tasks')
const connectDB=require('./db/connect')
require('dotenv').config()
const notFound=require('./middleware/notFound')
const errorHandlerMiddleware=require('./middleware/errorHandler')
// middleware
app.use(express.static('./public'))
app.use(express.json())


// routes

app.use('/api/v1/tasks',tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port=process.env.PORT||3000

const start =async()=>{
    try {
        await connectDB(process.env.MONGOURI)
        app.listen(port,()=>{
            console.log(`Server running on port ${port}!`);
        })
    } catch (error) {
        console.log(err);
    }
}

start();