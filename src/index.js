import navigationBar from "./navigation";
import './style.css'
import { getProjectList, addProject } from "./navigation";
import addTask from "./todo-item";

navigationBar()
getProjectList()
addProject('test')

const todoButton = document.querySelector('.todo-button')
todoButton.addEventListener('click', () => {
    addTask('newTask')
})