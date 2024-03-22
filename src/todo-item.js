import { getProjectsFormHTML } from "./projects";

const listOfTodos = [];
let currentView = 1

function sortTasks(tasks){
    tasks.sort((a, b) => {
        return (a.dueDate > b.dueDate) ? 1 : ((b.dueDate > a.dueDate) ? -1 : 0 )})
    console.log(tasks)
}

function setCurrentView(time){
    currentView = time;
    displayItems(currentView)
}

//Create new object and add it to the list of tasks
export default function addTask(title, description, dueDate, priority) {
    let task = new TodoItem(title, description, dueDate, priority);
    task.addItem();
}

//Form for both creating and editing tasks
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
            <textarea name="description" id="description" rows="4" cols="30" required></textarea>
        </div>

        <div class="form-row">
            <label for="due-date"><span aria-label="required">*</span>Task Due Date</label><br>
            <input type="date" name="due-date" id="due-date" required>
        </div>

        <div class="form-row">
            <label for="priority">Task Priority</label><br>

            <label for="none">None:</label>
            <input type="radio" name="priority" id="None" value="None">

            <label for="low">Low:</label>
            <input type="radio" name="priority" id="Low" value="Low">

            <label for="medium">Medium:</label>
            <input type="radio" name="priority" id="Medium" value="Medium">

            <label for="high">High:</label>
            <input type="radio" name="priority" id="High" value="High">
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

    form.innerHTML = createEditForm

    //Set form values to what the task already has if we are editing one
    if(obj){
        console.log("test")
        console.log(obj.priority)
        console.log(obj)
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
        //Check that the fields are filled out. 
        //If an obj was passed to the function we edit the task. Otherwise, we add it.
        if (title && description && dueDate && priority){
            if(obj){
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
    constructor(title, description, dueDate, priority, projects = 'All'){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projects = projects;
        this.idx = listOfTodos.length;
    }

    addItem(){
        listOfTodos.push(this);
        displayItems(currentView);
    }

    setTask(title, description, dueDate, priority){
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        displayItems(currentView);
    }

    editTask(){
        taskForm(this);
        displayItems(currentView)
    }

    deleteTask(){
        listOfTodos.splice(this.idx, 1);
        listOfTodos.forEach((item, i) => {
            item.idx = i
        })
        displayItems(currentView);
    }

    listItems(){
        console.log(listOfTodos)
    }
}


function displayItems(time){
    sortTasks(listOfTodos)
    const date = new Date();
    const today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + time)
    const future = new Date(futureDate.getTime() - (futureDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    const content = document.querySelector('.content');
    content.innerHTML = '';
    listOfTodos.forEach((todo) => {
        if (time == 1 || (todo.dueDate >= today && todo.dueDate <= future)){
            const task = document.createElement('div')
            task.className = 'task';
            const header = document.createElement('h3')
            header.innerText = todo.title
            const desc = document.createElement('p')
            desc.innerText = todo.description
            const dueDate = document.createElement('p');
            dueDate.innerText = `Due Date: ${todo.dueDate}`;
            const priority = document.createElement('p')
            priority.innerText = `Priority: ${todo.priority}`

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
                todo.editTask();
            })

            task.append(header)
            task.append(desc)
            task.append(dueDate)
            task.append(priority)
            task.append(delTaskBtn)
            task.append(editTaskBtn)
            content.append(task)
        }
    })
}



//test data
let task1 = new TodoItem('test1', 'desc of test 1', '2024-05-20', 'High');
listOfTodos.push(task1)
let task2 = new TodoItem('test2', 'desc of test 2', '2024-07-26', 'Medium');
listOfTodos.push(task2)
let task3 = new TodoItem('test3', 'desc of test 3', '2024-03-27', 'Low');
listOfTodos.push(task3)
let task4 = new TodoItem('test4', 'desc of test 4', '2024-03-10', 'High');
listOfTodos.push(task4)
let task5 = new TodoItem('test5', 'desc of test 5', '2023-05-16', 'None');
listOfTodos.push(task5)
let task6 = new TodoItem('test6', 'desc of test 6', '2024-10-16', 'None');
listOfTodos.push(task6)
let task7 = new TodoItem('test7', 'desc of test 7', '2024-12-16', 'None');
listOfTodos.push(task7)
let task8 = new TodoItem('test8', 'desc of test 8', '2024-01-16', 'None');
listOfTodos.push(task8)
let task9 = new TodoItem('test9', 'desc of test 9', '2024-02-16', 'None');
listOfTodos.push(task9)
let task10 = new TodoItem('test10', 'desc of test 10', '2024-01-16', 'None');
listOfTodos.push(task10)

sortTasks(listOfTodos)
displayItems(currentView);


export {taskForm, displayItems, setCurrentView}