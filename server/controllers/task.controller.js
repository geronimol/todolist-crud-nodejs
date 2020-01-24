const taskCtrl = {};
const Task = require("../models/task");

taskCtrl.getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

taskCtrl.getTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) throw 'Task not found'
        res.json(task);
    } catch (err) {
        next(err);
    }
};

taskCtrl.createTask = async (req, res, next) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.json("Saved");
    } catch (err) {
        next(err);
    }
};

taskCtrl.updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        //Validate title
        if (!req.body.title) throw 'Title is required'
        const task = {
            title: req.body.title,
            completed: req.body.completed
        }
        const result = await Task.findByIdAndUpdate(id, { $set: task }, { upsert: false });
        //Validate
        if (!result) throw 'Task not found';
        res.json("Updated");
    } catch (err) {
        next(err);
    }
};

taskCtrl.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndRemove(req.params.id);
        //Validate
        if (!task) throw 'Task not found'
        res.json("Deleted");
    } catch (err) {
        next(err);
    }
};

module.exports = taskCtrl;
