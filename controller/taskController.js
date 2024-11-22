const Task = require('../models/taskModel');

const createTask = async (req, res) => {
    const { title, description } = req.body;

    try {
        const newTask = await Task.create({
            title,
            description
        })

        return res
            .status(201)
            .json({
                message: "Task created successfully",
                task: {
                    id: newTask._id,
                    title: newTask.title,
                    description: newTask.description
                }
            })
    } catch (error) {
        console.log("POST :: /api/v1/task/new :: createTask error :: ", error);
        return res
            .status(500)
            .json({
                message: "Error while creating task"
            })
    }
}

const getAllTasks = async (req, res) => {
    try {
        const allTasks = await Task.find({}, {
            _id: 1,
            title: 1,
            description: 1
        });

        return res
            .status(200)
            .json({
                message: "All tasks fetched successfully",
                allTasks
            })
    } catch (error) {
        console.log("GET ::/api/v1/task :: getAllTasks error :: ", error);
        return res
            .status(500)
            .json({
                message: "Error while getting all tasks"
            })
    }
}

const markTaskCompleted = async (req, res) => {
    try {
        const task = req.task;

        if (task.completed) {
            return res
                .status(400)
                .json({
                    message: "Task is already completed"
                })
        } else {
            task.completed = true;
            await task.save();

            return res
                .status(200)
                .json({
                    message: "Task completed successfully"
                })
        }
    } catch (error) {
        console.log("GET :: /api/v1/task/:id/complete :: markTaskCompleted error :: ", error);
        return res
            .status(500)
            .json({
                message: "Error while marking task as completed"
            })
    }
}

const editTask = async (req, res) => {
    const { title, description } = req.body;
    const task = req.task;

    if (!title) {
        return res
            .status(400)
            .json({
                message: "Title is required"
            })
    }

    if (title == task.title && description == task.description) {
        return res
            .status(400)
            .json({
                message: "Task is already updated"
            })
    } else {
        task.title = title;
        task.description = description;
        await task.save();

        return res
            .status(200)
            .json({
                message: "Task updated successfully"
            })
    }
}

const deleteTask = async (req, res) => {
    const task = req.task;
    try {
        await task.deleteOne();
        return res
            .status(200)
            .json({
                message: "Task deleted successfully"
            })
    } catch (error) {
        console.log("GET :: /api/v1/task/:id/delete :: deleteTask error :: ", error);
        return res
            .status(500)
            .json({
                message: "Error while deleting task"
            })
    }
}

module.exports = {
    createTask,
    getAllTasks,
    markTaskCompleted,
    editTask,
    deleteTask
}