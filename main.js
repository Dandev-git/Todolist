const todos = document.getElementById('todos');
const form = document.querySelector('form');
const input = document.getElementById('todo');
const clearBtn = document.getElementById('clear');

todos.innerHTML = JSON.parse(localStorage.getItem('todos'));

form.onsubmit = (Event) => {
    Event.preventDefault();
    createTodo(input.value);
    form.reset();
}

function createTodo(text) {

    const todo = document.createElement('li');
    todo.innerHTML = text;
    const span = document.createElement('span');
    span.innerHTML = '\u00d7';
    todos.appendChild(todo);
    todo.appendChild(span);
    localStorage.setItem('todos', JSON.stringify(todos.innerHTML));
    todo.onclick = () => {
        if (todo.className !== 'checked') {
            todo.className = 'checked';
        } else {
            todo.className = '';
        }
        localStorage.setItem('todos', JSON.stringify(todos.innerHTML));
    }

    span.onclick = () => {
        todo.remove();
        span.remove();

        localStorage.setItem('todos', JSON.stringify(todos.innerHTML));
    }
}
