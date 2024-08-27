const todos = document.getElementById('todos');
const form = document.querySelector('form');
const input = document.getElementById('todo');
const clearBtn = document.getElementById('clear');

const oldTodos = JSON.parse(localStorage.getItem('todos'));
let todoData = oldTodos || [];

todoData.forEach(todo => {
    createTodo(todo);
});

form.onsubmit = (Event) => {
    Event.preventDefault();
    todoData.push(input.value);
    createTodo(input.value);
    form.reset();
}

function createTodo(text) {

    const todo = document.createElement('li');
    todo.innerHTML = text;
    const span = document.createElement('span');
    span.innerHTML = '\u00d7'
    todos.appendChild(todo);
    todo.appendChild(span);
    localStorage.setItem('todos', JSON.stringify(todoData));
    todo.onclick = () => {
        if (todo.className !== 'checked') {
            todo.className = 'checked';
        } else {
            todo.className = '';
        }
    }

    span.onclick = () => {
        todoData = todoData.filter(item => {
            return item !== todo.innerHTML.replace('<span>×</span>', '');
        })

        localStorage.setItem('todos', JSON.stringify(todoData));

        todo.remove();
        span.remove();
    }
}
