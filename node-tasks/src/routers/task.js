const express = require("express");
const Task = require("../models/task");
const router = new express.Router();
const auth = require("../middleware/auth");

// CREATE TASK
router.post("/tasks", auth, async (req, res) => {
  const task = await new Task({
    ...req.body,
    owner: req.user._id
  });

  try {
    task.save();
    res.status(201).send("all good " + task);
  } catch (e) {
    res.status(400).send("smth is wrong: " + e);
  }
});

// GET TASKS
// /tasks?completed=true&limit=2&skip=2&sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy){
    const part = req.query.sortBy.split(':')
    sort[part[0]] = part[1] === "asc" ? 1 : -1
  }

  try {
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort
        }
      })
      .execPopulate();

    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

// GET TASK
router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

// EDIT TASK
router.patch("/tasks/:id", auth, async (req, res) => {
  const keys = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const updateAllowed = keys.every(key => allowedUpdates.includes(key));
  const _id = req.params.id;

  if (!updateAllowed) {
    return res.status(400).send("update failed");
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!task) {
      return res.status(404).send("no such task");
    }

    keys.forEach(key => (task[key] = req.body[key]));
    await task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send("Update failed: " + e);
  }
});

// DELETE TASK
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!task) {
      return res.status(404).send("no such task");
    }

    res.send("task deleted");
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
