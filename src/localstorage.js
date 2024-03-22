import { getTasks } from "./todo-item";
import { getProjects, setProjectsFromLocalStorage } from "./projects";
import { setTasksFromLocalStorage } from "./todo-item";


export default function saveLocalStorage(){
    const projectData = JSON.stringify(getProjects());
    const taskData = JSON.stringify(getTasks());
    localStorage.setItem('tasks', taskData);
    localStorage.setItem('projects', projectData)
}

function loadLocalStorage(){
    const loadTaskData = localStorage.getItem('tasks')
    if (loadTaskData != null){
        setTasksFromLocalStorage(JSON.parse(loadTaskData))
    }

    const loadProjectData = localStorage.getItem('projects')
    if (loadProjectData != null){
        setProjectsFromLocalStorage(JSON.parse(loadProjectData))
    }
}

export {loadLocalStorage}