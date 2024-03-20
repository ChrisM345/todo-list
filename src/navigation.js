import { getProjects, addProject} from "./projects";

export default function navigationBar() {
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


    let navigationDefaultItems = ['Today', 'Next 7 Days', 'All My Tasks', 'My Calendar'];
    navigationDefaultItems.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-item';
        listItem.innerText = item;
        defaultList.append(listItem);
    })



    const projectList = document.createElement('ul')

    const addProjectBtn = document.createElement('button');
    addProjectBtn.className = 'add-project-btn';
    addProjectBtn.innerText = 'Add Project'
    projectList.append(addProjectBtn)

    const projectListHeader = document.createElement('h3');
    projectListHeader.innerText = 'My Projects'
    projectList.append(projectListHeader)
    const myProjects = getProjects()
    myProjects.forEach((project) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-item';
        listItem.innerText = project;
        projectList.append(listItem);
    })


    addProjectBtn.addEventListener('click', () => {
        let project = prompt("Please enter project name", "All")
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

function getProjectList(){
    console.log(myProjects)
}




export {getProjectList}