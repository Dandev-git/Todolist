const todos = document.getElementById('todos');
const form = document.querySelector('form');
const input = document.getElementById('todo');
const themeBtn = document.getElementById('theme-btn');

document.body.classList.add(localStorage.getItem('theme') || 'light');
if(document.body.classList.contains('dark')) {
    themeBtn.innerHTML = 'Light';
} else {
    themeBtn.innerHTML = 'Dark';
}

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

themeBtn.onclick = () => {
    if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        themeBtn.innerHTML = 'Light';
    } else {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        themeBtn.innerHTML = 'Dark';
    }

    localStorage.setItem('theme', document.body.classList);
}
