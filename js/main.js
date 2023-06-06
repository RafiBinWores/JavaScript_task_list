let newTask = document.getElementById('inputTask');
let taskAdd = document.getElementById('addTask');
let taskFilter = document.getElementById('taskFilter');
let clearBtn = document.getElementById('clearBtn');
let taskList = document.querySelector('ul');

// define event listener
taskAdd.addEventListener('click', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);

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
        newTask.value = ' ';
    }
    e.preventDefault();
}

// remove task
function removeTask(e){
    if(e.target.hasAttribute("href")){
        if(confirm("Are you Sure?")){
            let ele = e.target.parentElement;
            ele.remove();
        }
    }
}

//clear task
function clearTask(e){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}