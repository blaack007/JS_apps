
// setting uo variables
let theinput = document.querySelector(".add-task input");
let theaddbutton = document.querySelector(".add-task .plus");
let taskscontainer = document.querySelector(".tasks-content");
let noTaskMsg = document.querySelector(".no-tasks-message");
let taskscount = document.querySelector(".tasks-count span");
let taskscompleted = document.querySelector(".tasks-completed span");
let deleteall = document.querySelector(".delete");
let btn = document.querySelector(".delete-compelted");
let localtasks = [];

window.onload = function () {
    theinput.focus();
    //get tasks from local storage
    if (localStorage.tasks) {
        localtasks = JSON.parse(localStorage.tasks);
        localtasks.forEach((e) => {
            addtask(e.task, e.status);
        });
    }
    calculateTasks();
};

function localstorage(input, status = "") {
    let y = true;
    input = {
        task: input,
        status: status,
    };

    if (localStorage.tasks) {
        let localtasks = JSON.parse(localStorage.tasks);
        localtasks.forEach((e) => {
            if (e.task == input.task) {
                e.status = input.status;
                localStorage.tasks = JSON.stringify(localtasks);
                y = false;
                return;
            }
        });
    }
    if (y) {
        localtasks.push(input);
        localStorage.tasks = JSON.stringify(localtasks);
    }
}

function calculateTasks() {
    let counterTasks = document.querySelectorAll(
        ".tasks-content .task-box"
    ).length;
    //calculate all tasks
    taskscount.innerHTML = counterTasks;

    //calculate completed tasks
    counterCompeleted = taskscompleted.innerHTML = document.querySelectorAll(
        ".tasks-content .completed"
    ).length;
    if (counterTasks == 0) {
        taskscontainer.innerHTML = `<span class="no-tasks-message">No Tasks To Show</span>`;
        noTaskMsg = document.querySelector(".no-tasks-message");
        deleteall.classList.add("disabled");
    } else {
        deleteall.classList.remove("disabled");
    }

    if (counterCompeleted == 0) {
        btn.classList.add("disabled");
    } else {
        btn.classList.remove("disabled");
    }
}

function addtask(input, status) {
    //remove no task message
    noTaskMsg.remove();

    //create span element
    let mainspan = document.createElement("span");

    //create delete button
    let deleteelement = document.createElement("span");

    //create the main span text
    let text = document.createTextNode(input);

    //create the delete button text
    let deletetext = document.createTextNode("Delete");

    //add text to main span
    mainspan.appendChild(text);

    //add class to main span
    mainspan.className = "task-box";
    if (status == "completed") {
        mainspan.classList.add("completed");
    }

    //add text to delete button
    deleteelement.appendChild(deletetext);

    //add class to delete button
    deleteelement.className = "delete-task";

    //add delete button to main span
    mainspan.appendChild(deleteelement);

    //add the task to the container
    taskscontainer.appendChild(mainspan);

    //empty the input
    theinput.value = "";

    //focus on field
    theinput.focus();

    //calculate tasks
    calculateTasks();
}

deleteall.addEventListener("click", function () {
    document.querySelectorAll(".tasks-content .task-box").forEach((e) => {
        e.remove();
    });
    localStorage.clear();
    calculateTasks();
});

btn.addEventListener("click", function () {
    document.querySelectorAll(".tasks-content .completed").forEach((e) => {
        e.remove();
    });
    let compleated = JSON.parse(localStorage.tasks);
    compleated = compleated.filter((e) => {
        if (e.status == "") {
            return e;
        }
    });
    localStorage.tasks = JSON.stringify(compleated);
    calculateTasks();
});

function validate() {
    let tasks = Array.from(document.querySelectorAll(".task-box"));
    setTimeout(() => {
        theinput.focus();
    }, 100);
    tasks.forEach((e) => {
        if (theinput.value == e.childNodes[0].nodeValue.trim()) {
            Swal.fire({
                title: "warning",
                text: "Please, write a task.",
                icon: "warning",
                confirmButtonText: "Cool",
            });
            throw new Error("Duplicate task");
        }
    });

    if (theinput.value === "") {
        Swal.fire({
            title: "Error!",
            text: "Please, write a task.",
            icon: "error",
            confirmButtonText: "Cool",
        });
    } else {
        localstorage(theinput.value);
        addtask(theinput.value);
    }
}

theaddbutton.addEventListener("click", validate);

document.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
        validate();
    }
});

document.addEventListener("click", function (e) {
    if (e.target.className == "delete-task") {
        let val = e.target.parentNode.childNodes[0].nodeValue.trim();
        let del = JSON.parse(localStorage.tasks);
        del = del.filter((e) => {
            if (e.task != val) {
                return e;
            }
        });
        localStorage.tasks = JSON.stringify(del);
        e.target.parentNode.remove();
        calculateTasks();
    }
    if (e.target.classList.contains("task-box")) {
        e.target.classList.toggle("completed");
        if (e.target.classList.contains("completed")) {
            localstorage(e.target.childNodes[0].nodeValue.trim(), "completed");
        } else {
            localstorage(e.target.childNodes[0].nodeValue.trim(), "");
        }
        calculateTasks();
    }
});
