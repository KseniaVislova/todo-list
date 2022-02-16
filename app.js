const addTaskButton = document.getElementById('add-task-button');
const taskList  = document.getElementById('task-list');
let deleteBtns = document.querySelectorAll('.delete-btn')
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


tasks.forEach(task => {
  let li = document.createElement('li');
  li.classList.add('task-item');
  li.setAttribute('id', task.id)

  let input = li.appendChild( document.createElement('input'));
  input.type = 'checkbox';
  input.onclick = function() {
    toggleClass(this);
  };

  let span = li.appendChild( document.createElement('span'));
  span.classList.add('task');
  span.textContent = task.title;

  if (task.completed) {
    input.setAttribute('checked', '');
     span.classList.toggle('done');
  }

  button = li.appendChild(document.createElement('button'));
  button.classList.add('delete-btn');
  button.textContent = 'x';
  button.onclick = function() {
    deleteTask(this);
  };

  taskList.appendChild(li);
})

const addTask = () => {
  const inputTask  = document.getElementById('input-task');

  let li = document.createElement('li');
  console.log(li)
  li.classList.add('task-item');

  let input = li.appendChild( document.createElement('input'));
  input.type = 'checkbox';
  input.onclick = function() {
    toggleClass(this);
  };

  let span = li.appendChild( document.createElement('span'));
  span.classList.add('task');
  span.textContent = inputTask.value;

  button = li.appendChild(document.createElement('button'));
  button.classList.add('delete-btn');
  button.textContent = 'x';
  button.onclick = function() {
    deleteTask(this);
  };

  let id = Math.round(Date.now() * Math.random());
  li.setAttribute('id', id)

  taskList.appendChild(li);

  let item = {
    id: id,
    title:  inputTask.value,
    completed: false,
  }

  tasks.push(item);

  inputTask.value = '';

  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function deleteTask(e) {
  e.parentNode.remove();
  const result = tasks.filter(task => {
    return e.parentNode.id != task.id
  })
  tasks = result;
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function toggleClass(e) {
  e.nextElementSibling.classList.toggle('done');
  tasks.forEach(task => {
    if (e.parentNode.id == task.id) {
      task.completed = !task.completed;
    }
  })
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

addTaskButton.addEventListener('click', addTask);
