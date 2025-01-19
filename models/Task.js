const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,  // Task name is required
  },
  isCompleted: {
    type: Boolean,
    required: true,  // Whether the task is completed or not
    default: false,
  },
}, {
  timestamps: true,  // Automatically add createdAt and updatedAt fields
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

