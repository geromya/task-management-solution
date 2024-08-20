const taskService = require('../services/taskService');

class TaskController {
    async createNewTask(req, res) {
        try {
            const taskXid = await taskService.createNewTask(req.body);
            res.status(201).send(`Task created with ID: ${taskXid}`);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async findTaskByXid(req, res) {
        try {
            const task = await taskService.findTaskByXid(req.params.taskXid);
            res.status(200).json(task);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async updateTask(req, res) {
        try {
            await taskService.updateTask(req.params.taskXid, req.body);
            res.status(204).send();
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async deleteTask(req, res) {
        try {
            await taskService.deleteTask(req.params.taskXid);
            res.status(204).send();
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async getAllTasks(req, res) {
        try {
            const tasks = await taskService.findAllTasks();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
   
}

module.exports = new TaskController();
