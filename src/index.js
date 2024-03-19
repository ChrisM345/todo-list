import navigationBar from "./navigation";
import './style.css'
import { getProjectList, addProject } from "./navigation";
import {addTask, taskForm} from "./todo-item";

navigationBar()

const todoButton = document.querySelector('.todo-button')
todoButton.addEventListener('click', () => {
    taskForm(0);
    // dialog.showModal();// addTask('newTask')
})