var taskCreatorEl = document.querySelector(".task-creator");
var addTaskBtn = document.querySelector("#add-task");

function createPageOn(num){
    document.querySelector("#task-title").value = ""
    document.querySelector("#due-date").value = ""
    document.querySelector("#task-detail").value = ""
    
    taskCreatorEl.classList.toggle("task-creator-on");
    if(num == 1){
        addTaskBtn.disabled = true;
    }
    else{
        addTaskBtn.disabled = false
    }
}