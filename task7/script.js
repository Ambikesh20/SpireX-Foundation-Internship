const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const errorMsg = document.getElementById('errorMsg');
const taskCount = document.getElementById('taskCount');
let totalTasks = 0;

function updateTaskCount() {
    taskCount.innerText = `Total Tasks: ${totalTasks}`;
}

function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        errorMsg.style.display = 'block';
        return;
    }
    errorMsg.style.display = 'none';

    const li = document.createElement('li');
    
    const span = document.createElement('span');
    span.innerText = taskText;
    li.appendChild(span);

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'task-actions';

    const completeBtn = document.createElement('button');
    completeBtn.innerText = 'Complete';
    completeBtn.className = 'complete-btn';
    completeBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
    });
    actionsDiv.appendChild(completeBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
        li.remove();
        totalTasks--;
        updateTaskCount();
    });
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(actionsDiv);
    taskList.appendChild(li);

    taskInput.value = '';
    
    totalTasks++;
    updateTaskCount();
}

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
