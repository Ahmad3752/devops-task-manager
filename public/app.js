const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const errorMessage = document.getElementById('error-message');

async function loadTasks() {
  try {
    const response = await fetch('/api/tasks');
    if (!response.ok) throw new Error('Failed to load tasks');
    const tasks = await response.json();
    renderTasks(tasks);
  } catch (err) {
    showError(err.message);
  }
}

function renderTasks(tasks) {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty';
    empty.textContent = 'No tasks yet. Add one above!';
    taskList.appendChild(empty);
    return;
  }

  tasks.forEach((task) => {
    const li = document.createElement('li');
    const title = document.createElement('span');
    title.className = 'task-title';
    title.textContent = task.title;

    const id = document.createElement('span');
    id.className = 'task-id';
    id.textContent = `#${task.id}`;

    li.appendChild(title);
    li.appendChild(id);
    taskList.appendChild(li);
  });
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
}

function clearError() {
  errorMessage.classList.add('hidden');
  errorMessage.textContent = '';
}

taskForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  clearError();

  const title = taskInput.value.trim();
  if (!title) return;

  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || 'Failed to add task');
    }

    taskInput.value = '';
    await loadTasks();
  } catch (err) {
    showError(err.message);
  }
});

loadTasks();
