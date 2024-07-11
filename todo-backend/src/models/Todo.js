const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'completed'],
        default: 'active'
    },
    date: {
        type: Date,
        default: Date.now,
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;
