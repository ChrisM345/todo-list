import { addProject } from "./navigation"
import { getProjectsFormHTML } from "./projects";

const listOfTodos = [];

export default function addTask(title, description, dueDate, priority) {
    let task = new TodoItem(title, description, dueDate, priority);
    task.addItem();
    console.log(listOfTodos)
}

function taskForm(obj){
    const form = document.querySelector('.form');
    const createEditForm = `
    <dialog class="dialog">
    <form>
        <div class="form-row">
            <label for="title"><span aria-label="required">*</span>Task Title</label><br>
            <input type="text" name="title" id="title" required>
        </div>

        <div class="form-row">
            <label for="description"><span aria-label="required">*</span>Task Description</label><br>
            <input type="textarea" name="description" id="description" required>
        </div>

        <div class="form-row">
            <label for="due-date"><span aria-label="required">*</span>Task Due Date</label><br>
            <input type="date" name="due-date" id="due-date" required>
        </div>

        <div class="form-row">
            <label for="priority">Task Priority</label><br>

            <label for="none">None:</label>
            <input type="radio" name="priority" id="none" value="none">

            <label for="low">Low:</label>
            <input type="radio" name="priority" id="low" value="low">

            <label for="medium">Medium:</label>
            <input type="radio" name="priority" id="medium" value="medium">

            <label for="high">High:</label>
            <input type="radio" name="priority" id="high" value="high">
        </div>

        <div class="form-row">
            <label for="project">Project Label</label><br>
            <select name="project" id="project">
                `+getProjectsFormHTML()+`
            </select>
        </div>
        <button class="btnSubmit" type="submit">Submit</button>
    </form>
    <button class="close">Close</button>
    </dialog>`

    // const formDiv = document.createElement('div')
    form.innerHTML = createEditForm
    // form.append(formDiv)

    //Set form values to what the task already has if we are editing one
    if(obj){
        console.log("test")
        document.querySelector('#title').value = obj.title;
        document.querySelector('#description').value = obj.description;
        document.querySelector('#due-date').value = obj.dueDate;
        document.querySelector(`#${obj.priority}`).checked = true
    }

    const dialog = document.querySelector('.dialog');
    const closeButton = document.querySelector('.close');
    const btnSubmit = document.querySelector(".btnSubmit");

    dialog.showModal();

    closeButton.addEventListener('click', () => {
        dialog.close();
        form.innerHTML = '';
    })

    btnSubmit.addEventListener('click', (event) => {
        event.preventDefault();
        const title = document.querySelector('#title').value;
        const description = document.querySelector('#description').value;
        const dueDate = document.querySelector('#due-date').value;
        const priority = document.querySelector('input[name="priority"]:checked').value;
        if (title && description && dueDate && priority){
            if(obj){
                console.log("editing")//setTask(title, description, dueDate, priority)
                obj.setTask(title, description, dueDate, priority)
            } else{
                addTask(title, description, dueDate, priority)
            }
            dialog.close();
            form.innerHTML = '';
        }
    })
}

class TodoItem {
    constructor(title, description, dueDate, priority, projects = ['All']){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projects = projects;
        this.idx = listOfTodos.length;
    }

    addItem(){
        listOfTodos.push(this)
        const content = document.querySelector('.content');
        const task = document.createElement('div')
        task.className = 'task';
        const header = document.createElement('h3')
        header.innerText = this.title
        const desc = document.createElement('p')
        desc.innerText = this.description

        const delTaskBtn = document.createElement('button');
        delTaskBtn.className = 'delete-task';
        delTaskBtn.innerText = 'Delete Task';

        delTaskBtn.addEventListener('click', () => {
            this.deleteTask();
        })

        task.append(header);
        task.append(desc);
        task.append(delTaskBtn);
        content.append(task);
    }

    setTask(title, description, dueDate, priority){
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.displayItems();
    }

    editTask(){
        const content = document.querySelector('.content');
        const createEditForm = `
        <dialog class="edit-dialog">
        <form>
            <div class="form-row">
                <label for="edit-title"><span aria-label="required">*</span>Task Title</label><br>
                <input type="text" name="edit-title" id="edit-title" required>
            </div>

            <div class="form-row">
                <label for="edit-description"><span aria-label="required">*</span>Task Description</label><br>
                <input type="textarea" name="edit-description" id="edit-description" required>
            </div>

            <div class="form-row">
                <label for="edit-due-date"><span aria-label="required">*</span>Task Due Date</label><br>
                <input type="date" name="edit-due-date" id="edit-due-date" required>
            </div>

            <div class="form-row">
                <label for="edit-priority">Task Priority</label><br>

                <label for="none">None:</label>
                <input type="radio" name="edit-priority" id="edit-none" value="none">

                <label for="low">Low:</label>
                <input type="radio" name="edit-priority" id="edit-low" value="low">

                <label for="medium">Medium:</label>
                <input type="radio" name="edit-priority" id="edit-medium" value="medium">

                <label for="high">High:</label>
                <input type="radio" name="edit-priority" id="edit-high" value="high">
            </div>
            <button class="editBtnSubmit" type="submit">Submit</button>
        </form>
        <button class="edit-close">Close</button>
    </dialog>`

    const editFormDiv = document.createElement('div')
    editFormDiv.innerHTML = createEditForm
    content.append(editFormDiv)

    //Set form values to what the task already has
    document.querySelector('#edit-title').value = this.title;
    document.querySelector('#edit-description').value = this.description;
    document.querySelector('#edit-due-date').value = this.dueDate;
    document.querySelector(`#edit-${this.priority}`).checked = true

    const editDialog = document.querySelector('.edit-dialog');
    const closeButton = document.querySelector('.edit-close');
    const btnSubmit = document.querySelector(".editBtnSubmit");

    editDialog.showModal();

    closeButton.addEventListener('click', () => {
        editDialog.close();
    })

    btnSubmit.addEventListener('click', (event) => {
        console.log("submit")
        event.preventDefault();
        const title = document.querySelector('#edit-title').value;
        const description = document.querySelector('#edit-description').value;
        const dueDate = document.querySelector('#edit-due-date').value;
        const priority = document.querySelector('input[name="edit-priority"]:checked').value;
        if (title && description && dueDate && priority){
            this.title = title
            this.description = description
            this.dueDate = dueDate
            this.priority = priority
            editDialog.close();
            this.displayItems();
        }
    })



    }

    deleteTask(){
        listOfTodos.splice(this.idx, 1);
        listOfTodos.forEach((item, i) => {
            item.idx = i
        })
        this.displayItems();
    }

    listItems(){
        console.log(listOfTodos)
    }

    displayItems(){
        const content = document.querySelector('.content');
        content.innerHTML = '';
        listOfTodos.forEach((todo) => {
            const task = document.createElement('div')
            task.className = 'task';
            const header = document.createElement('h3')
            header.innerText = todo.title
            const desc = document.createElement('p')
            desc.innerText = todo.description

            const delTaskBtn = document.createElement('button');
            delTaskBtn.className = 'delete-task';
            delTaskBtn.innerText = 'Delete Task';

            const editTaskBtn = document.createElement('button');
            editTaskBtn.className = 'edit-task'
            editTaskBtn.innerText = 'Edit Task'
    
            delTaskBtn.addEventListener('click', () => {
                todo.deleteTask();
            })

            editTaskBtn.addEventListener('click', () => {
                taskForm(this)
            })

            task.append(header)
            task.append(desc)
            task.append(delTaskBtn)
            task.append(editTaskBtn)
            content.append(task)
        })
    }
}

let task1 = new TodoItem('test1', 'desc of test 1', '2024-03-16', 'high');
listOfTodos.push(task1)
let task2 = new TodoItem('test2', 'desc of test 2', '2024-03-16', 'low');
listOfTodos.push(task2)
let task3 = new TodoItem('test3', 'desc of test 3', '2024-03-16', 'low');
listOfTodos.push(task3)
let task4 = new TodoItem('test4', 'desc of test 4', '2024-03-16', 'low');
listOfTodos.push(task4)
let task5 = new TodoItem('test5', 'desc of test 5', '2024-03-16', 'low');
listOfTodos.push(task5)

task5.displayItems();


export {taskForm}