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

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.display = 'inline';
    checkbox.addEventListener('change', () => {
        todoData = todoData.filter(item => {
            return item !== todo.innerHTML;
        })

        localStorage.setItem('todos', JSON.stringify(todoData));

        checkbox.remove();
        todo.remove();
        br.remove();
    });

    const todo = document.createElement('li');
    todo.innerHTML = text;
    todo.style.display = 'inline';

    const br = document.createElement('br');

    todos.appendChild(checkbox);
    todos.appendChild(todo);
    todos.appendChild(br);

    localStorage.setItem('todos', JSON.stringify(todoData));
}

clearBtn.onclick = () => {
    todos.innerHTML = '';
    todoData = [];
    localStorage.removeItem('todos');
}
