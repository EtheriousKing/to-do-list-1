$("form").on("submit", (e) => {
    e.preventDefault();
    addTask();
});

function addTask() {
    var task = $("form #taskInput");
    var pendingList = $("#pendingTaskList");
    var dailyTasks = Array.from(JSON.parse(localStorage.getItem("dailyTasks")));

    dailyTasks.forEach((element) => {
        if(element.task === task.val()) {
            alert("Task Already exists");
            task.val("");
            return
        }
    })
    localStorage.setItem("dailyTasks", JSON.stringify([...JSON.parse(localStorage.getItem("dailyTasks") || "[]"), { task: task.val(), completed: false }]));
}

