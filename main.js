const todos = document.getElementById('todos');
const form = document.querySelector('form');
const input = document.getElementById('todo');
const clearBtn = document.getElementById('clear');

const oldTodos = JSON.parse(localStorage.getItem('todos'));
let todoData = oldTodos || [];

todoData.forEach(todo => {
    createTodo(todo.text, todo.className);
});

form.onsubmit = (Event) => {
    Event.preventDefault();
    const newTodo = { text: input.value, className: '' };
    todoData.push(newTodo);
    createTodo(newTodo.text, newTodo.className);
    form.reset();
}

function createTodo(text, className) {

    const todo = document.createElement('li');
    todo.innerHTML = text;
    todo.className = className || '';

    const span = document.createElement('span');
    span.innerHTML = '\u00d7'
    todos.appendChild(todo);
    todo.appendChild(span);
    localStorage.setItem('todos', JSON.stringify(todoData));

    todo.onclick = () => {
        todo.classList.toggle('checked');
        const todoIndex = Array.from(todos.children).indexOf(todo);
        todoData[todoIndex].className = todo.className;
        localStorage.setItem('todos', JSON.stringify(todoData));
    }

    span.onclick = (e) => {
        e.stopPropagation();
        const todoIndex = Array.from(todos.children).indexOf(todo);
        todoData.splice(todoIndex, 1);

        localStorage.setItem('todos', JSON.stringify(todoData));

        todo.remove();
        span.remove();
    }
}
