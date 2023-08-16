const addButton = $("#addButton")
const task = $("#taskInput");

addButton.prop('disabled',true);

task.on("change" , () => {
    toggleButton();
});

function toggleButton () {
    if ($.trim(task.val()) === "") {
        addButton.prop('disabled',true);
    } else {
        addButton.prop('disabled',false);
    }
}
