const titleValidator = (req, res, next) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({
            success: false,
            message: "Task title is required. Please provide a valid title.",
        });
    }
    next();
}

const dueDateValidator = (req, res, next) => {
    const { dueDate } = req.body;

    if (dueDate) {
        const parseDate = new Date(dueDate);
        if (isNaN(parseDate)) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format. Please provide a valid date with format: YYYY-MM-DD",
            });
        }

        if (parseDate < new Date()) {
            return res.status(400).json({
                success: false,
                message: "Due date cannot be in the past. Please provide a valid date.",
            });
        }
    }
    next();
}

module.exports = {
    titleValidator,
    dueDateValidator
}