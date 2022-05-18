const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const GetAllTasks = require('./Repository.js').GetAllTasks;
const CreateTask = require('./Repository.js').CreateTask;
const FindById = require('./Repository.js').FindById;
const UpdateTaskById = require('./Repository.js').UpdateTaskById;
const DeleteTaskById = require('./Repository.js').DeleteTaskById;
const Task = require('./Repository.js').Task;


app.get('/api/tasks',(req,res)=>{
   GetAllTasks((err,data)=>{
         if(err) console.error(err);
         else res.json(data);
   }); 
});

app.get('/api/tasks/:id',(req,res)=>{
    FindById(req.params.id,(err,data)=>{
        if(err) console.error(err);
        else res.json(data);
    });
});
app.post('/api/tasks',(req,res)=>{

    var task = new Task({
        task: req.body.task,
        completed: false,
        createdat: new Date(),
        deadline :new Date().setDate(new Date().getDate() + 4)
    });
    CreateTask(task,(err,data)=>{
        if(err) console.error(err);
        else res.json(data);
    });
});

app.put('/api/tasks/:id',(req,res)=>{
    const id = req.params.id;
    var task = new Task({
        task: req.body.task,
        completed: req.body.completed,
        deadline :req.body.deadline
    });
        UpdateTaskById(id,task,(err,data)=>{
            if(err) console.error(err);
            res.json(data);
        });
    });   

app.delete('/api/tasks/:id',(req,res)=>{
    const id = req.params.id;
    DeleteTaskById(id,(err,data)=>{
        if(err) console.error(err);
        else res.json(data);
    });
});

app.listen(3000,()=>{
    console.log('Listening on port 3000');
});