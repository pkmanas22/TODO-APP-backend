const express = require('express');
const { getAllTasks, createTask, markTaskCompleted, editTask, deleteTask } = require('../controller/taskController');
const { titleValidator, dueDateValidator } = require('../config/validator');
const { checkTaskExists } = require('../config/middleware');

const taskRouter = express.Router();

taskRouter.get('/', getAllTasks);   
taskRouter.post('/new', titleValidator, dueDateValidator, createTask);
taskRouter.get('/:id/complete', checkTaskExists, markTaskCompleted);
taskRouter.put('/:id/edit', dueDateValidator, checkTaskExists, editTask);
taskRouter.get('/:id/delete', checkTaskExists, deleteTask);

module.exports = taskRouter;