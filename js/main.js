let newTask = document.getElementById('inputTask');
let taskAdd = document.getElementById('addTask');
let taskFilter = document.getElementById('taskFilter');
let clearBtn = document.getElementById('clearBtn');
let taskList = document.querySelector('ul');

// define event listener
taskAdd.addEventListener('click', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
taskFilter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTask);

// function define
// add task
function addTask(e){
    if(newTask.value === ''){
        alert('Add a task!')
    }else{
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(newTask.value + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#')
        link.innerHTML = 'X';
        li.appendChild(link);
        taskList.appendChild(li);

        storeInLocalStorage(newTask.value);

        newTask.value = "";
    }
    e.preventDefault();
}

// remove task
function removeTask(e){
    if(e.target.hasAttribute("href")){
        if(confirm("Are you Sure?")){
            let ele = e.target.parentElement;
            ele.remove();
            removeFromLocalStorage(ele);
        }
    }
}

//clear task
function clearTask(e){
    // taskList.innerHTML =" ";

    //faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
}

// filter task
function filterTask(e){
    let text = e.target.value.toLowerCase();
    
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    })
}

// store in local storage
function storeInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTask(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#')
        link.innerHTML = 'X';
        li.appendChild(link);
        taskList.appendChild(li);
    })
}

function removeFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskItem;
    li.removeChild(li.lastChild);

    tasks.forEach((task, index) =>{
        if(li.textContent.trim () === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}