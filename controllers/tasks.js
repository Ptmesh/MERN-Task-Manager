const Task = require('../models/Task')
const asyncWrap=require('../async')
const{createCustomError}=require('../errors/custom-error')

// Get All 
const getAllTasks= asyncWrap(async (req,res)=>{
        const tasks=await Task.find({})
        res.status(200).json({tasks})
})


// Create
const createTask= asyncWrap(async (req,res)=>{
        const task= await Task.create(req.body)
        res.status(201).json({task})
})


// Get Single
const getTask= asyncWrap(async (req,res,next)=>{

        const{id:taskID}=req.params
        const task = await Task.findOne({_id:taskID});

        if(!task){
            // const error=new Error('Not Found');
            // error.status=404;
            // return next(error);
            return next(createCustomError(`No task with ID: ${taskID}`,404))
        }
        res.status(200).json({task})
    } 
)

// Delete
const deleteTask= asyncWrap(async (req,res)=>{
   
        const{id:taskID}=req.params
        const task = await Task.findOneAndDelete({_id:taskID});
        if (!task) {
            return next(createCustomError(`No task with ID: ${taskID}`,404))
        }
        res.status(200).json({task});
})



// Update 
const updateTask= asyncWrap((async(req,res)=>{
        const{id:taskID}=req.params;
    
        const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true,
        })
        if (!task) {
            return next(createCustomError(`No task with ID: ${taskID}`,404))
        }
        res.status(200).json({task})
}))

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    getTask,
    deleteTask
};

