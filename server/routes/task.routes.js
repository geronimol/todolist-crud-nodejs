const express = require('express');
const router = express.Router();

const taskCtrl = require('../controllers/task.controller');

router.get('/', taskCtrl.getTasks);
router.post('/', taskCtrl.createTask);
router.get('/:id', taskCtrl.getTask);
router.put('/:id', taskCtrl.updateTask);
router.delete('/:id', taskCtrl.deleteTask);

module.exports = router;