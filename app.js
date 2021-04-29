const todoInput=document.querySelector(".todo-input");
const todoButton=document.querySelector(".todo-button");
const todoList=document.querySelector(".todo-list");

todoButton.addEventListener("click",addTodo)
todoList.addEventListener("click", deleteCheck)
document.addEventListener('DOMContentLoaded',getTodos)

const filteroption=document.querySelector(".filter-todo")
filteroption.addEventListener('click',filterTodo)

function addTodo(event){
    event.preventDefault()
    if (todoInput.value.length>0){
    const tododiv=document.createElement('div')
    tododiv.classList.add("todo")

    const newTodo=document.createElement('li')
    newTodo.innerText=todoInput.value
    newTodo.innerText=newTodo.innerText.charAt(0).toUpperCase() + newTodo.innerText.slice(1);
    newTodo.classList.add('todo-item')
    tododiv.appendChild(newTodo)

    saveLocalTodos(todoInput.value)

    const completedButton=document.createElement('button')
    completedButton.innerHTML='<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn")
    tododiv.appendChild(completedButton)
    
    const trashButton=document.createElement('button')
    trashButton.innerHTML='<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    tododiv.appendChild(trashButton)

    todoList.appendChild(tododiv)
    todoInput.value=""
}
}
function deleteCheck(e){
    const item=e.target
    if (item.classList[0]==="trash-btn"){
        const todo=item.parentElement;
        todo.classList.add("fall")
        removelocaltodos(todo)
        todo.addEventListener('transitionend',function(){
            todo.remove()
        })



    }
    if (item.classList[0]==="complete-btn"){
        const todo=item.parentElement
        todo.classList.toggle("completed")
    }

}
function filterTodo(e){
    const todos=todoList.childNodes
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display="flex"
                break
            case "completed":
                if (todo.classList.contains("completed")){
                    todo.style.display="flex"
                }
                else{
                    todo.style.display="none"
                }
                break
            case "incomplete":
                if (!todo.classList.contains("completed")){
                    todo.style.display="flex"
                }
                else{
                    todo.style.display="none"
                }
                break
                
        }
    })
}
function saveLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos')==null){
        todos=[]

    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos',JSON.stringify(todos))
}

function getTodos(){
    let todos;
    if (localStorage.getItem('todos')==null){
        todos=[]

    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'))
    }

    todos.forEach(function(todo){
    const tododiv=document.createElement('div')
    tododiv.classList.add("todo")

    const newTodo=document.createElement('li')
    newTodo.innerText=todo
    newTodo.innerText=newTodo.innerText.charAt(0).toUpperCase() + newTodo.innerText.slice(1);
    newTodo.classList.add('todo-item')
    tododiv.appendChild(newTodo)



    const completedButton=document.createElement('button')
    completedButton.innerHTML='<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn")
    tododiv.appendChild(completedButton)
    
    const trashButton=document.createElement('button')
    trashButton.innerHTML='<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    tododiv.appendChild(trashButton)

    todoList.appendChild(tododiv)
    }
    )

}
function removelocaltodos(todo){

    let todos;
    if (localStorage.getItem('todos')==null){
        todos=[]

    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex=todos.indexOf(todo.children[0].innerText)

    todos.splice(todoIndex,1)

    localStorage.setItem('todos',JSON.stringify(todos))

}