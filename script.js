document.getElementById('form-Task').addEventListener('submit', saveTask);

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filter = 'all';
let editingTaskId = '';

// Save new To-Do
function saveTask(e) {
  e.preventDefault();

  let titleInput = document.getElementById('title');
  let descriptionInput = document.getElementById('description');

  let title = titleInput.value.trim();
  let description = descriptionInput.value.trim();

  if (title === '' || description === '') {
    showError('Please enter both a title and description');
    return;
  }

  if (editingTaskId !== '') {
    // Editing an existing task
    tasks = tasks.map(task => {
      if (task.id === editingTaskId) {
        return {
          ...task,
          title,
          description
        };
      }
      return task;
    });
    editingTaskId = '';
  } else {
    // Creating a new task
    let task = {
      id: Date.now().toString(),
      title,
      description,
      done: false
    };
    tasks.push(task);
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));

  renderTasks();
  titleInput.value = '';
  descriptionInput.value = '';
}

// Delete To-Do
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Toggle task done status
function toggleTaskDone(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      return {
        ...task,
        done: !task.done
      };
    }
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Edit task
function editTask(id) {
  let task = tasks.find(task => task.id === id);
  let titleInput = document.getElementById('title');
  let descriptionInput = document.getElementById('description');

  titleInput.value = task.title;
  descriptionInput.value = task.description;

  editingTaskId = id;
}

// Filter tasks
function setFilter(value) {
  filter = value;
  renderTasks();
}

// Show error message
function showError(message) {
  let errorDiv = document.createElement('div');
  errorDiv.className = 'error';
  errorDiv.textContent = message;

  document.body.insertBefore(errorDiv, document.querySelector('.container'));

  setTimeout(() => {
    errorDiv.remove();
  }, 4000);
}

// Render tasks
function renderTasks() {
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';

  let filteredTasks = tasks;

  if (filter === 'done') {
    filteredTasks = tasks.filter(task => task.done);
  } else if (filter === 'undone') {
    filteredTasks = tasks.filter(task => !task.done);
  }

  for (let i = 0; i < filteredTasks.length; i++) {
    let task = filteredTasks[i];
    let taskElement = document.createElement('div');
    taskElement.className = 'task';

    let titleElement = document.createElement('h3');
    titleElement.className = 'task-title';
    titleElement.textContent = task.title;

    let descriptionElement = document.createElement('p');
    descriptionElement.className = 'task-description';
    descriptionElement.textContent = task.description;

    let buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'task-buttons';

    let doneButton = document.createElement('button');
    doneButton.textContent = 'Done';
    doneButton.className = 'btn btn-success';
    doneButton.addEventListener('click', () => toggleTaskDone(task.id));

    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'btn btn-primary';
    editButton.addEventListener('click', () => editTask(task.id));

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'btn btn-danger';
    deleteButton.addEventListener('click', () => deleteTask(task.id));

    buttonsDiv.appendChild(doneButton);
    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(deleteButton);

    taskElement.appendChild(titleElement);
    taskElement.appendChild(descriptionElement);
    taskElement.appendChild(buttonsDiv);

    tasksView.appendChild(taskElement);
  }
}

renderTasks();
