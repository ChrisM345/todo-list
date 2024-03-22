import { resetDeletedProject } from "./todo-item";
import saveLocalStorage from "./localstorage";
import navigationBar from "./navigation";

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
        saveLocalStorage();
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

function deleteProject(project){
    console.log(project)
    const deletedProject = document.querySelector(`.project-${project}`)
    deletedProject.parentNode.remove();
    myProjects.splice(myProjects.indexOf(project), 1);
    saveLocalStorage();
    resetDeletedProject(project)
}

function setProjectsFromLocalStorage(data){
    myProjects.length = 0;
    data.forEach((project) => {
        myProjects.push(project)
    })
}

function deleteProjectForm(){
    const form = document.querySelector('.form');
    const createDeleteProjectForm = `
    <dialog class="dialog-delete">
    <form>
    <div class="form-row">
        <label for="project-delete">Delete Project Label</label><br>
        <select name="project-delete" id="project-delete">
        `+getProjectsFormHTML()+`
        </select>
    </div>
    <button class="btnSubmitDelete" type="submit">Delete</button>
    </form>
    <button class="closeDeleteForm">Close</button>
    </dialog>`
    form.innerHTML = createDeleteProjectForm

    const dialogDelete = document.querySelector('.dialog-delete');
    const closeDelButton = document.querySelector('.closeDeleteForm');
    const btnSubmitDelete = document.querySelector('.btnSubmitDelete');

    dialogDelete.showModal();

    closeDelButton.addEventListener('click', () => {
        dialogDelete.close();
        form.innerHTML = '';
    })

    btnSubmitDelete.addEventListener('click', (event) => {
        event.preventDefault();
        const projectLabel = document.querySelector('#project-delete').value
        if (projectLabel != 'All') {deleteProject(projectLabel)}
        dialogDelete.close();
        form.innerHTML = '';
    })
}
export {getProjects, getProjectsFormHTML, addProject, getSelectedProjectView, setSelectedProjectView, deleteProjectForm, setProjectsFromLocalStorage}