const enterTask = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");

addButton.disabled = true;

enterTask.addEventListener("change" , toggleButton);

function toggleButton () {
    if (enterTask.value.trim() === "") {
        addButton.disabled = true;
    } else {
        addButton.disabled = false;
    }
}