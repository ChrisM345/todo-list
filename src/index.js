import { loadLocalStorage } from "./localstorage";
import navigationBar from "./navigation";
import './style.css'
import {taskForm} from "./todo-item";
import { getSelectedProjectView, setSelectedProjectView } from "./projects";

loadLocalStorage()
navigationBar()

const todoButton = document.querySelector('.todo-button')
todoButton.addEventListener('click', () => {
    taskForm(0);
})