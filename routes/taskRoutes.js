const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/createTask', (req, res) => taskController.createNewTask(req, res));
router.get('/getTask/:taskXid', (req, res) => taskController.findTaskByXid(req, res));
router.put('/updateTask/:taskXid', (req, res) => taskController.updateTask(req, res));
router.delete('/deleteTask/:taskXid', (req, res) => taskController.deleteTask(req, res));
router.get('/tasks', taskController.getAllTasks);

module.exports = router;
