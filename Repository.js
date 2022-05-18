require('dotenv').config();
const mongoose = require('mongoose');
const secret = process.env['MONGO_URL'];
console.log('Connecting to MongoDB...');
mongoose.connect(secret, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('Connected to MongoDB');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    task : {
        type: String,
    },
    completed : {
        type: Boolean,
    },
    createdat : {
        type: Date,
    },
    deadline:{
        type: Date
    }
});

const Task = mongoose.model('Task', TaskSchema);
console.log('Repository.js loaded');

const GetAllTasks = (done)=>{
    Task.find((err,data)=>{
        if(err) console.error(err);
        else done(null,data);
    });
};
const CreateTask =(newtask,done)=>{
    newtask.save((err,data)=>{
        if(err) console.error(err);
        else done(null,data);
    });

};

const FindById=(id,done)=>{ 
    Task.findById(id,(err,data)=>{
        if(err) console.error(err);
        else done(null,data);
    });
};
const UpdateTaskById = (id,task,done)=>{
Task.findById({_id:id},(err,data)=>{
    if(err) console.error(err);
    else{
        data.task = task.task;
        data.completed = task.completed;
        data.deadline = task.deadline;
        data.save((err,data)=>{
            if(err) console.error(err);
            else done(null,data);
        });
    }
});
};

const DeleteTaskById = (id,done)=>{
    Task.findByIdAndRemove({_id:id},(err,data)=>{
        if(err) console.error(err);
        else done(null,data);
    });
};

exports.CreateTask = CreateTask;
exports.DeleteTaskById = DeleteTaskById;
exports.FindById = FindById;
exports.GetAllTasks = GetAllTasks;
exports.UpdateTaskById = UpdateTaskById;
exports.Task = Task;    