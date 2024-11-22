const Task = require('../models/taskModel');

const checkTaskExists = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task._id) {
            req.task = task;
            next();
        }
    } catch (error) {
        console.log("Middleware :: checkTaskExists :: ", error);
        return res
            .status(404)
            .json({ message: 'Task not found' });
    }
}

module.exports = {
    checkTaskExists
}