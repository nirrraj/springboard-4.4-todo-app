/* JS Todos Exercise
http://curric.rithmschool.com/springboard/exercises/js-todos/

Part 1
For this assignment you will be combining your knowledge of DOM access and events to build a todo app!

As a user, you should be able to:

- Add a new todo (by submitting a form)
- Mark a todo as completed (cross out the text of the todo)
- Remove a todo

Part 2
Now that you have a functioning todo app, save your todos in localStorage! Make sure that when the page refreshes, the todos on the page remain there.
*/

window.addEventListener("load",loadTasks());

let form = document.querySelector('form');
form.addEventListener('submit',function (evt){
    evt.preventDefault();
    let newTaskName = form.newTaskName.value;
    let newTaskLi = document.createElement("li");
    newTaskLi.classList.add('todoTask');
    newTaskLi.innerHTML = `<input type="checkbox"> ${newTaskName} <button class="delete">x</button>`;
    document.querySelector('ul').append(newTaskLi);
    saveTasks(taskList);
    form.reset();
});

let taskList = document.querySelector('ul');
taskList.addEventListener('click',function (evt){
    let evtTarget = evt.target;
    let targetName = evtTarget.nodeName;
    if(targetName == "LI"){
        evtTarget.querySelector('button').classList.toggle('delete');
    }
    else if(targetName == "INPUT"){
        evtTarget.parentElement.classList.toggle('completed');
    }
    else if(targetName == "BUTTON"){
        evtTarget.parentElement.remove();
    }
    saveTasks(taskList);
});

function saveTasks(taskList){
    localStorage.clear();
    let currentTasks = taskList.querySelectorAll('li'); 
    for(let t=0; t<currentTasks.length; t++){
        let currTaskName = currentTasks[t].innerText;
        let currTaskStatus = currentTasks[t].className;
        let currTaskObj = { "name":currTaskName.replace(" x",""), "status":currTaskStatus };
        localStorage.setItem(t.toString(),JSON.stringify(currTaskObj));
    }
}

function loadTasks(){
    let taskArr = [];
    for(let ls=0; ls<localStorage.length; ls++){
        let savedTaskKey = localStorage.key(ls);
        let savedTaskObj = JSON.parse(localStorage.getItem(savedTaskKey));
        taskArr.push([Number(savedTaskKey),savedTaskObj.name,savedTaskObj.status]);
    }

    taskArr.sort(sortByNumInCol1);

    for(let ta=0; ta<taskArr.length; ta++){
        let savedTaskLi = document.createElement("li");
        savedTaskLi.className = taskArr[ta][2];
        let markCheckboxAttribute = "";
        if(savedTaskLi.className.includes("completed")){
            markCheckboxAttribute = "checked";
        }
        savedTaskLi.innerHTML = `<input type="checkbox" ${markCheckboxAttribute}> ${taskArr[ta][1]} <button class="delete">x</button>`;
        document.querySelector('ul').append(savedTaskLi);
    }
}

function sortByNumInCol1(a,b){
    if(Number(a[0]) > Number(b[0])){ return 1; }
    if(Number(a[0]) < Number(b[0])){ return -1; }
    return 0;
}