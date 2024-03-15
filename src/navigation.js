const myProjects = ['All']

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
    const projectListHeader = document.createElement('h3');
    projectListHeader.innerText = 'My Projects'
    projectList.append(projectListHeader)
    myProjects.forEach((project) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-item';
        listItem.innerText = project;
        projectList.append(listItem);
    })

    navigationBar.append(defaultList)
    navigationBar.append(projectList)
    //<ul><li>
}

function getProjectList(){
    console.log(myProjects)
}

function addProject(projectName){
    myProjects.push(projectName)
    getProjectList();
}

export {getProjectList, addProject}