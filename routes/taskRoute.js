const express = require('express');
const { getAllTasks, createTask, markTaskCompleted, editTask, deleteTask } = require('../controller/taskController');
const { titleValidator, dueDateValidator, categoryValidator } = require('../config/validator');
const { checkTaskExists } = require('../config/middleware');

const taskRouter = express.Router();

taskRouter.get('/', getAllTasks);   
taskRouter.post('/new', titleValidator, dueDateValidator, categoryValidator, createTask);
taskRouter.get('/:id/complete', checkTaskExists, markTaskCompleted);
taskRouter.put('/:id/edit', dueDateValidator, checkTaskExists, categoryValidator, editTask);
taskRouter.get('/:id/delete', checkTaskExists, deleteTask);

module.exports = taskRouter;