const express = require('express');
const { getAllTasks, createTask, markTaskCompleted, editTask, deleteTask } = require('../controller/taskController');
const { titleValidator } = require('../config/validator');

const taskRouter = express.Router();

taskRouter.get('/', getAllTasks);   
taskRouter.post('/new', titleValidator, createTask);
taskRouter.put('/:id/complete', markTaskCompleted);
taskRouter.put('/:id/edit', editTask);
taskRouter.put('/:id/delete', deleteTask);

module.exports = taskRouter;