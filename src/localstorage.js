import { getTasks } from "./todo-item";
import { getProjects, setProjectsFromLocalStorage } from "./projects";
import { setTasksFromLocalStorage } from "./todo-item";


export default function updateLocalStorage(){
    const projectData = JSON.stringify(getProjects());
    const taskData = JSON.stringify(getTasks());
    localStorage.setItem('tasks', taskData);
    localStorage.setItem('projects', projectData)
}

function getSavedData(){
    if (localStorage.getItem('tasks') == null){
        console.log('tasks null!')
    } else{
        console.log(JSON.parse(localStorage.getItem('tasks')))
        setTasksFromLocalStorage(JSON.parse(localStorage.getItem('tasks')))
    }

    if (localStorage.getItem('projects') == null){
        console.log('projects null')
    } else {
        setProjectsFromLocalStorage(JSON.parse(localStorage.getItem('projects')))
    }
}

export {getSavedData}