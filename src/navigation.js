import { getProjects, addProject} from "./projects";
import { setCurrentView } from "./todo-item";
import { getSelectedProjectView } from "./projects";
export default function navigationBar() {

    const topBar = document.querySelector('.top-bar');
    topBar.innerText = `View: All My Tasks, Projects: ${getSelectedProjectView()}`
    const navigationBar = document.querySelector('.navigation');
    const defaultList = document.createElement('ul')

    //Add a button to the default navigation bar to add tasks
    const todoListItem = document.createElement('li');
    todoListItem.className = 'add-task-item';
    const todoButton = document.createElement('button');
    todoButton.className = 'todo-button'
    todoButton.innerText = 'Add Task'
    todoListItem.append(todoButton)
    defaultList.append(todoListItem)


    //Include default views for tasks
    const navigationDefaultItems = ['Today', 'Next 7 Days', 'All My Tasks'];
    navigationDefaultItems.forEach((item) => {
        const listItem = document.createElement('li');
        const listButton = document.createElement('button')
        listButton.className = 'list-item';
        listButton.innerText = item;
        listButton.addEventListener('click', (e) => {
            topBar.innerText = `${e.target.innerText}, ${getSelectedProjectView()}`
            displayTaskCase(e.target.innerText);
        })
        listItem.append(listButton)
        defaultList.append(listItem);
    })

    //Include views for different project labels
    const projectList = document.createElement('ul')

    //Add a button to prompt user for new project label.
    const addProjectBtn = document.createElement('button');
    addProjectBtn.className = 'add-project-btn';
    addProjectBtn.innerText = 'Add Project'
    projectList.append(addProjectBtn)

    //Project List Header
    const projectListHeader = document.createElement('h3');
    projectListHeader.innerText = 'My Projects'
    projectList.append(projectListHeader)

    //Get the array of projects and add each label to the navigation bar
    const myProjects = getProjects()
    myProjects.forEach((project) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-item';
        listItem.innerText = project;
        projectList.append(listItem);
    })


    addProjectBtn.addEventListener('click', () => {
        let project = prompt("Please enter project name", "All")

        //Adds the project only if the label doesn't already exist in the array
        const addedProjectBool = addProject(project)
        if (addedProjectBool) {
            const listItem = document.createElement('li');
            listItem.className = 'list-item';
            listItem.innerText = project;
            projectList.append(listItem);
        }
    })

    navigationBar.append(defaultList)
    navigationBar.append(projectList)
    //<ul><li>
}

function displayTaskCase(time){
    switch (time) {
        case 'Today':
            adjustTaskView(0);
            break;
        case 'Next 7 Days':
            adjustTaskView(7);
            break;
        case 'All My Tasks':
            adjustTaskView(1);
            break;
    }
}
function adjustTaskView(time){
    setCurrentView(time)
}