const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true, enum: ['Pending', 'InProgress', 'Completed'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
