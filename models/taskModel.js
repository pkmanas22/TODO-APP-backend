const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        enum: ["urgent", "important", "normal"],
        default: "normal"
    }
}, {
    timestamps: true
})

const Task = mongoose.model('tasks', taskSchema);

module.exports = Task;