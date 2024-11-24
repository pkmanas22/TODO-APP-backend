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

module.exports = {
    titleValidator
}