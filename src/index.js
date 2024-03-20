import navigationBar from "./navigation";
import './style.css'
import {taskForm} from "./todo-item";

navigationBar()

const todoButton = document.querySelector('.todo-button')
todoButton.addEventListener('click', () => {
    taskForm(0);
})