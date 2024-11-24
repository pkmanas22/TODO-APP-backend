const Task = require('../models/taskModel');

const checkTaskExists = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found. Please check the ID and try again.",
            });
        }
        req.task = task;
        next();
    } catch (error) {
        console.error("Middleware :: checkTaskExists :: ", error);
        return res.status(400).json({
            success: false,
            message: "Invalid Task ID format.",
            details: error.message,
        });
    }
}

module.exports = {
    checkTaskExists
}