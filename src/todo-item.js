import { addProject } from "./navigation"

const listOfTodos = [];

export default function addTask(title, description, dueDate, priority) {
    console.log("in the function")
    // addProject(task)
    // let task = new TodoItem
    console.log(title)
    console.log(description)
    console.log(dueDate)
    console.log(priority)
}


class TodoItem {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    addItem(){
        listOfTodos.push(this)
    }

    listItems(){
        console.log(listOfTodos)
    }
}

// Brainstorm what kind of properties your todo-items are going to have. 
// At a minimum they should have a title, description, dueDate and priority. 
// You might also want to include notes or even a checklist.