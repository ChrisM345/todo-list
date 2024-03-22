const myProjects = ['All', 'Test']
let selectedProjectView = 'All';

function getProjects() {
    return myProjects
}

function addProject(project){
    if (myProjects.includes(project)){
        return 0;
    }
    else {
        myProjects.push(project)
        return 1;
    }
}

function getProjectsFormHTML() {
    let projectsHTML = '';
    myProjects.forEach((project) => {
        const option = document.createElement('option');
        option.value = project;
        option.innerText = project;
        projectsHTML += option.outerHTML;
    })
    return projectsHTML;
}

function getSelectedProjectView(){
    return selectedProjectView;
}

function setSelectedProjectView(view){
    selectedProjectView = view;
}

export {getProjects, getProjectsFormHTML, addProject, getSelectedProjectView, setSelectedProjectView}