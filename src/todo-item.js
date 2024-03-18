import { addProject } from "./navigation"

const listOfTodos = [];





export default function addTask(title, description, dueDate, priority) {
    // // addProject(task)
    // console.log(title)
    // console.log(description)
    // console.log(dueDate)
    // console.log(priority)
    let task = new TodoItem(title, description, dueDate, priority);
    task.addItem();
    console.log(listOfTodos)
}

class TodoItem {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
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

    editTask(){
        console.log('edit!')
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
            <button class="btnSubmit" type="submit">Add Todo Task</button>
        </form>
        <button class="close">Close</button>
    </dialog>`

    const editFormDiv = document.createElement('div')
    editFormDiv.innerHTML = createEditForm
    content.append(editFormDiv)
    console.log(this.title)
    document.querySelector('#edit-title').value = this.title;
    document.querySelector('#edit-description').value = this.description;
    document.querySelector('#edit-due-date').value = this.dueDate;
    // document.querySelector('#edit-due-date').value = '2024-03-18';
    console.log(this.dueDate)
    document.querySelector(`#edit-${this.priority}`).checked = true
    const editDialog = document.querySelector('.edit-dialog');
    editDialog.showModal();

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
            //do something
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
                todo.editTask();
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

// Brainstorm what kind of properties your todo-items are going to have. 
// At a minimum they should have a title, description, dueDate and priority. 
// You might also want to include notes or even a checklist.