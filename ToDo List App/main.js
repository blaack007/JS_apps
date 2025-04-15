/*
tasks 
1 - use sweet alert if input is empty 

*/


// setting uo variables
let theinput = document.querySelector(".add-task input");
let theaddbutton = document.querySelector(".add-task .plus");
let taskscontainer = document.querySelector(".tasks-content");
let noTaskMsg = document.querySelector(".no-tasks-message")
let taskscount = document.querySelector(".tasks-count span");
let taskscompleted = document.querySelector(".tasks-completed span");

window.onload = function()
{
    theinput.focus();
};


theaddbutton.addEventListener("click", function()
{
if(theinput.value === "") {
    Swal.fire({
        title: 'Error!',
        text: 'Please, write a task.',
        icon: 'error',
        confirmButtonText: 'Cool'
      });
}
});

