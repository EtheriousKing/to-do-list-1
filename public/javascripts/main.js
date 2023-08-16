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

$("#dailyForm").on("submit", function (e) {
    e.preventDefault();
    addTask();
});

    // On app load, get all tasks from localStorage
    window.onload = loadTasks;

    function loadTasks() {
      let tasks = Array.from(JSON.parse(localStorage.getItem("dailyTaskList")));
      tasks.forEach(task => {
        const list = $("#dailyPendingTasks");
        list.append(`<li><input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
        <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
        <button class="del" onclick="removeTask(this)">Delete</button></li>`);
      });
    }

    function addTask() {
      const list = $("#dailyPendingTasks");
      localStorage.setItem("dailyTaskList", JSON.stringify([...JSON.parse(localStorage.getItem("dailyTaskList") || "[]"), { task: dailyTask.val(), completed: false }]));
      list.append(`<li><input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
      <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
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
      $(event).next().prop('disabled', function(index, prop){
        return prop == true ? null : true;
    });
    }

    function removeTask(event) {
      let tasks = Array.from(JSON.parse(localStorage.getItem("dailyTaskList")));
      tasks.forEach((task,index) => {
        if (task.task === $(event).parent().next().find("input[type='text']").val()) {
          tasks.splice(index, 1);
        }
      });
      localStorage.setItem("dailyTaskList", JSON.stringify(tasks));
      $(event).parent().remove();
    }

    // store current task to track changes
    var currentTask = null;

    // get current task
    function getCurrentTask(event) {
      currentTask = $(event).val();
    }

    // edit the task and update local storage
    function editTask(event) {
      let tasks = Array.from(JSON.parse(localStorage.getItem("dailyTaskList")));
      // check if task is empty

      // update task
      tasks.forEach(task => {
        if (task.task === currentTask) {
          task.task = $(event).val();
        }
      });
      // update local storage
      localStorage.setItem("dailyTaskList", JSON.stringify(tasks));
    }
