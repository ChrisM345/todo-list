import navigationBar from "./navigation";
import './style.css'
import { getProjectList, addProject } from "./navigation";
import addTask from "./todo-item";

navigationBar()
getProjectList()
addProject('test')

const dialog = document.querySelector('dialog');
const showButton = document.querySelector('dialog + button');
const closeButton = document.querySelector('.close');
const btnSubmit = document.querySelector(".btnSubmit");

const todoButton = document.querySelector('.todo-button')
todoButton.addEventListener('click', () => {
    dialog.showModal();// addTask('newTask')
})

closeButton.addEventListener('click', () => {
    dialog.close();
})

btnSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const dueDate = document.querySelector('#due-date').value;
    const priority = document.querySelector('input[name="priority"]:checked').value;
    if (title && description && dueDate && priority){
        addTask(title, description, dueDate, priority);
        dialog.firstChild.reset();
        dialog.close();
    }
})