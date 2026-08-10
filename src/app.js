const path = require('path');
const express = require('express');

const app = express();

let tasks = [];
let nextId = 1;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const title = req.body && req.body.title;

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'A non-empty "title" string is required.' });
  }

  const task = { id: nextId++, title: title.trim() };
  tasks.push(task);
  res.status(201).json(task);
});

module.exports = app;
