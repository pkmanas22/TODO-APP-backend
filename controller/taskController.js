const Task = require('../models/taskModel');

const createTask = async (req, res) => {
    const { title, description, dueDate, category } = req.body;

    const parseDate = new Date(dueDate);

    if (isNaN(parseDate)) {
        return res.status(400).json({
            success: false,
            message: "Invalid date format. Please provide a valid date with format: YYYY-MM-DD",
        });
    }

    try {
        const newTask = await Task.create({
            title,
            description,
            dueDate: parseDate,
            category: category || "normal",
        })

        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            task: {
                id: newTask._id,
                title: newTask.title,
                description: newTask.description,
                dueDate: newTask.dueDate.toLocaleDateString(),
                category: newTask.category
            },
        });
    } catch (error) {
        console.error("POST :: /api/v1/task/new :: createTask error :: ", error);
        return res.status(500).json({
            success: false,
            message: "Could not create the task. Please try again later.",
            details: error.message,
        });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const allTasks = await Task.find({}, {
            _id: 1,
            title: 1,
            description: 1,
            completed: 1,
            dueDate: 1,
            category: 1
        });
        return res.status(200).json({
            success: true,
            message: "Tasks retrieved successfully",
            tasks: allTasks,
        });
    } catch (error) {
        console.error("GET ::/api/v1/task :: getAllTasks error :: ", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching tasks. Please try again later.",
            details: error.message,
        });
    }
};


const markTaskCompleted = async (req, res) => {
    try {
        const task = req.task;

        if (task.completed) {
            return res.status(400).json({
                success: false,
                message: "Task is already marked as completed.",
            });
        }
        task.completed = true;
        await task.save();

        return res.status(200).json({
            success: true,
            message: "Task marked as completed successfully.",
        });
    } catch (error) {
        console.error("GET :: /api/v1/task/:id/complete :: markTaskCompleted error :: ", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while marking the task as completed. Please try again later.",
            details: error.message,
        });
    }
}

const editTask = async (req, res) => {
    const { title, description, dueDate, category } = req.body;
    const task = req.task;

    const parseDate = new Date(dueDate);
    
    try {
        if (title == "" || description == "" || dueDate == "" || category == "") {
            return res.status(400).json({
                success: false,
                message: "Please fill the required fields.",
            });
        }
    
        if (title == task.title && description == task.description && parseDate.toString() == task.dueDate.toString() && category == task.category) {
            return res.status(400).json({
                success: false,
                message: "No changes detected. Task is already up-to-date.",
            });
        }
    
        if (title) task.title = title;
        if (description) task.description = description;
        if (parseDate) task.dueDate = parseDate;
        if (category) task.category = category;

        await task.save();
    
        return res.status(200).json({
            success: true,
            message: "Task updated successfully.",
            task: {
                id: task._id,
                title: task.title,
                description: task.description,
                dueDate: task.dueDate.toLocaleDateString(),
                category: task.category
            },
        });
    } catch (error) {
        console.error("PUT :: /api/v1/task/:id/edit :: editTask error :: ", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the task. Please try again later.",
            details: error.message,
        });
    }
}

const deleteTask = async (req, res) => {
    const task = req.task;

    try {
        await task.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully.",
        });
    } catch (error) {
        console.error("GET :: /api/v1/task/:id/delete :: deleteTask error :: ", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the task. Please try again later.",
            details: error.message,
        });
    }
}

module.exports = {
    createTask,
    getAllTasks,
    markTaskCompleted,
    editTask,
    deleteTask
}