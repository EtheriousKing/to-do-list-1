const addButton = $("#addButton")
const task = $("#taskInput");
const dailyTask = $("#dailyTaskInput");

addButton.prop('disabled',true);

dailyTask.on("change" , () => {
    toggleButton(dailyTask);
})

task.on("change" , () => {
    toggleButton(task);
});

function toggleButton (event) {
    if ($.trim(event.val()) === "") {
        addButton.prop('disabled',true);
    } else {
        addButton.prop('disabled',false);
    }
}

$( window ).on("load", function() {
    loadTasks();
});

$("#dailyForm").on("submit", function (e) {
    e.preventDefault();
    addTask();
});

function loadTasks() {
    if (localStorage.getItem("dailyTaskList") == null) return;
    var tasks = Array.from(JSON.parse(localStorage.getItem("dailyTaskList")));
    if(tasks.length > 0) {
        tasks.forEach(task => {
        const list = $("#dailyPendingTasks");
        const li = $("<li></li>");
        list.append(
            li.html(
                `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}/>
                <input type="text" value="${task.task}" class="${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
                <button class="del" onclick="removeTask(this)">Delete</button>`
            ));
        });
    }
}

function addTask() {
    const list = $("#dailyPendingTasks");
    localStorage.setItem("dailyTaskList", JSON.stringify([...JSON.parse(localStorage.getItem("dailyTaskList") || "[]"), { task: dailyTask.val(), completed: false }]));
    list.prepend(
        `<li><input type="checkbox" onclick="taskComplete(this)"} class="check" ${task.completed ? 'checked' : ''}>
        <input type="text" value="${dailyTask.val()}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
        <button class="del" onclick="removeTask(this)">Delete</button></li>`);
    dailyTask.val("");
}

function taskComplete(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("dailyTaskList")));
    tasks.forEach(task => {
    if (task.task === $(event).next().val()) {
        task.completed = !task.completed;
    }
    });
    localStorage.setItem("dailyTaskList", JSON.stringify(tasks));
    $(event).next().toggleClass("completed");
}

function removeTask(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("dailyTaskList")));
    tasks.forEach((task,index) => {
    if (task.task === $(event).parent().find("input[type='text']").val()) {
        tasks.splice(index, 1);
    }
    });
    localStorage.setItem("dailyTaskList", JSON.stringify(tasks));
    $(event).parent().remove();
}
var currentTask = null;

function getCurrentTask(event) {
    currentTask = $(event).val();
}

function editTask(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("dailyTaskList")));
    tasks.forEach(task => {
    if (task.task === currentTask) {
        task.task = $(event).val();
    }
    });
    localStorage.setItem("dailyTaskList", JSON.stringify(tasks));
}
