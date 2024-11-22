const express = require('express');
const { getAllTasks, createTask, markTaskCompleted, editTask, deleteTask } = require('../controller/taskController');

const taskRouter = express.Router();

taskRouter.get('/', getAllTasks);   
taskRouter.post('/new', createTask);
taskRouter.put('/:id/complete', markTaskCompleted);
taskRouter.put('/:id/edit', editTask);
taskRouter.put('/:id/delete', deleteTask);

module.exports = taskRouter;