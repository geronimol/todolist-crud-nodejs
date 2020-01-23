const taskCtrl = {};
const Task = require('../models/task');

taskCtrl.getTasks = async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
}

taskCtrl.getTask = async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
}

taskCtrl.createTask = async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json('Saved');
}

taskCtrl.updateTask = async (req, res) => {
    const { id } = req.params;
    const task = {
        title: req.body.title,
        completed: req.body.completed
    };
    await Task.findByIdAndUpdate(id, {$set: task}, {upsert : true});
    res.json('Updated');
}

taskCtrl.deleteTask = async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json('Deleted');
}

module.exports = taskCtrl;