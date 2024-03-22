import { setCurrentView } from "./todo-item";
import { getProjects, addProject, getSelectedProjectView, setSelectedProjectView, deleteProjectForm} from "./projects";

export default function navigationBar() {
    getSelectedProjectView();
    const topBar = document.querySelector('.top-bar');
    topBar.innerText = `View: All My Tasks, Projects: ${getSelectedProjectView()}`
    const navigationBar = document.querySelector('.navigation');
    const defaultList = document.createElement('ul')

    //Add a button to the default navigation bar to add tasks
    let view = 'All My Tasks';
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
            view = e.target.innerText
            topBar.innerText = `View: ${view}, Projects: ${getSelectedProjectView()}`
            displayTaskCase(view);
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

    //Add a button to delete project label
    const deleteProjectBtn = document.createElement('button');
    deleteProjectBtn.className = 'del-project-btn';
    deleteProjectBtn.innerText = 'Delete Project'
    deleteProjectBtn.addEventListener('click', () => {
        deleteProjectForm();
    })

    projectList.append(deleteProjectBtn)

    //Project List Header
    const projectListHeader = document.createElement('h3');
    projectListHeader.innerText = 'My Projects'
    projectList.append(projectListHeader)

    //Get the array of projects and add each label to the navigation bar
    const myProjects = getProjects()
    myProjects.forEach((project) => {
        const listItem = document.createElement('li');
        const listButton = document.createElement('button')
        listButton.className = 'list-item';
        listButton.classList.add(`project-${project}`)
        listButton.innerText = project;
        //Set the project label as a button and allow it to update the current task view
        listButton.addEventListener('click', (e) => {
            topBar.innerText = `View: ${view}, Projects: ${e.target.innerText}`
            setSelectedProjectView(e.target.innerText)
            displayTaskCase(view)
        })
        listItem.append(listButton);
        projectList.append(listItem);
    })


    addProjectBtn.addEventListener('click', () => {
        let project = prompt("Please enter project name", "All")

        //Adds the project only if the label doesn't already exist in the array
        const addedProjectBool = addProject(project)
        if (addedProjectBool) {
            const listItem = document.createElement('li');
            const listButton = document.createElement('button')
            listButton.className = 'list-item';
            listButton.classList.add(`project-${project}`)
            listButton.innerText = project;
            //Set the project label as a button and allow it to update the current task view
            listButton.addEventListener('click', (e) => {
                topBar.innerText = `View: ${view}, Projects: ${e.target.innerText}`
                setSelectedProjectView(e.target.innerText)
                displayTaskCase(view)
            })
            listItem.append(listButton)
            projectList.append(listItem);
        }
    })

    navigationBar.append(defaultList)
    navigationBar.append(projectList)
}

//Takes the time (Today, Next 7 Days, All) and adjusts the view
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