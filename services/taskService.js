const Task = require('../models/task');

class TaskService {
    async createNewTask(taskData) {
        try {
            const task = new Task(taskData);
            await task.save();
            return task._id;
        } catch (error) {
            console.error('Error creating task:', error);
            throw new Error('Failed to create task');
        }
    }

    async findTaskByXid(taskXid) {
        try {
            const task = await Task.findById(taskXid);
            if (!task) {
                throw new Error('Task not found');
            }
            return task;
        } catch (error) {
            console.error('Error retrieving task:', error);
            throw new Error('Failed to retrieve task');
        }
    }

    async updateTask(taskXid, taskData) {
        try {
            const updatedTask = await Task.findByIdAndUpdate(taskXid, taskData, { new: true });
            if (!updatedTask) {
                throw new Error('Task not found');
            }
            return updatedTask;
        } catch (error) {
            console.error('Error updating task:', error);
            throw new Error('Failed to update task');
        }
    }

    async deleteTask(taskXid) {
        try {
            const result = await Task.findByIdAndDelete(taskXid);
            if (!result) {
                throw new Error('Task not found');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            throw new Error('Failed to delete task');
        }
    }
    async findAllTasks() {
        try {
            const tasks = await Task.find();
            return tasks;
        } catch (error) {
            console.error('Error retrieving tasks:', error);
            throw new Error('Failed to retrieve tasks');
        }
    }

}

module.exports = new TaskService();
