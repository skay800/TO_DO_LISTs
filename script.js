  // Retrieve tasks from local storage or create an empty array
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Function to save tasks to local storage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Function to render tasks
  function renderTasks() {
    const taskList = document.getElementById('task-list');
    const filterRadio = document.querySelector('input[name="filter"]:checked');
    const filter = filterRadio ? filterRadio.value : 'all';

    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
      if (filter === 'all' || (filter === 'done' && task.done) || (filter === 'undone' && !task.done)) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item' + (task.done ? ' done' : '');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.addEventListener('change', () => {
          task.done = checkbox.checked;
          saveTasks();
          renderTasks();
        });

        const input = document.createElement('input');
        input.type = 'text';
        input.value = task.text;
        input.addEventListener('change', () => {
          task.text = input.value;
          saveTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          tasks.splice(index, 1);
          saveTasks();
          renderTasks();
        });

        taskItem.appendChild(checkbox);
        taskItem.appendChild(input);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
      }
    });
  }

 // Function to display an error message
function displayErrorMessage(message) {
const errorMessage = document.getElementById('error-message');
errorMessage.textContent = message;

if (message !== '') {
  setTimeout(() => {
    errorMessage.textContent = '';
  }, 3000); // Delay in milliseconds (3 seconds in this case)
}
}

  // Function to add a new task
  function addTask() {
    const input = document.getElementById('new-task-input');
    const text = input.value.trim();

    if (text !== '') {
      tasks.push({ text, done: false });
      saveTasks();
      input.value = '';
      renderTasks();
      displayErrorMessage(''); // Clear any previous error message
    } else {
      displayErrorMessage('You must enter a task'); // Display the error message
    }
  }

  // Event listener for add task button
  const addTaskBtn = document.getElementById('add-task-btn');
  addTaskBtn.addEventListener('click', addTask);

  // Event listener for enter key press in the input field
  const newTaskInput = document.getElementById('new-task-input');
  newTaskInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      addTask();
    }
  });

  // Event listener for filter change
  const filterRadios = document.querySelectorAll('input[name="filter"]');
  filterRadios.forEach((radio) => {
    radio.addEventListener('change', renderTasks);
  });

  // Initial rendering of tasks
  renderTasks();