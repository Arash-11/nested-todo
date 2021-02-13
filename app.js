const tasks = [];

const body = document.getElementById('body');
const input = document.getElementById('input');
const button = document.querySelector('.add-task-btn');

let idTracker = 1;

let firstRootTask;


function addTask (inputValue) {
  tasks.push({
    id: idTracker,
    parent: inputValue,
    children: []
  });
  if (idTracker > 1) {
    firstRootTask = document.getElementById(tasks[0].id);
    firstRootTask.parentElement.id = 'root-container';
  }
  displayTask(body, idTracker, inputValue);
  idTracker++;
}


function addSubTask (arr, parentElement, parentId, inputValue) {
  arr.forEach(task => {
    if (task.id === +parentId) {
      task.children.push({
        id: idTracker,
        parent: inputValue,
        children: []
      });
      if (idTracker > 1) {
        firstRootTask = document.getElementById(tasks[0].id);
        firstRootTask.parentElement.id = 'root-container';
      }
      displayTask(parentElement, idTracker, inputValue);
      idTracker++;
      return;
    }
    else if (task.children.length > 0) {
      addSubTask(task.children, parentElement, parentId, inputValue);
    }
  });
}


function displayTask (container, id, inputValue) {
  let ul = document.createElement('ul');
  let li;
  container.appendChild(ul);

  li = document.createElement('li');
  const taskName = document.createTextNode(inputValue);
  const input = document.createElement('input');
  const button = document.createElement('button');
  button.innerText = 'Add sub-task';
  button.className = 'add-subtask-btn';
  li.appendChild(taskName);
  li.appendChild(input);
  li.appendChild(button);
  ul.appendChild(li);
  li.id = id;
}


body.addEventListener('click', (e) => {
  if (e.target.className === 'add-task-btn') {
    addTask(input.value);
    input.value = '';
  }
  else if (e.target.className === 'add-subtask-btn') {
    const parentElement = e.target.parentElement;
    const parentId = e.target.parentElement.id;
    const inputValue = e.target.previousSibling.value;
    if (inputValue == '') return;
    addSubTask(tasks, parentElement, parentId, inputValue);
    e.target.previousSibling.value = '';
  }
});