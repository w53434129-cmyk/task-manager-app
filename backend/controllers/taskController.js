const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({
      title,
      description,
      status: status || "Todo", // default to Todo if not provided
      user: req.userId
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.title = title || task.title;
    task.description = description || task.description;
    if (status) task.status = status; // update status if provided

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
