function getTodos() {
    // initialize array for todos
    let todos = [];
    // grab data from localStorage
    let todoString = localStorage.getItem("todos");
    // convert what's in localStorage to JSON
    if(todoString !== null) {
    todos = JSON.parse(todoString);
    }
    return todos;
}

function add() {
    let todos = getTodos();
    // get data the user typed into the input
    let itemContent = document.getElementById("todo-item-content").value;
    // push to todos array defined above from localStorage
    if (itemContent !== "") {
        todos.push(itemContent);
        localStorage.setItem("todos", JSON.stringify(todos));
        show();
        // clear input afterwards
        document.getElementById("todo-item-content").value = "";
    }
}

function show() {
    let todos = getTodos();
    // start html
    let html = '<ul>';
    // add each todo item + button to string as an <li>
    for(let i = 0; i < todos.length; i++) {
        html += '<li>' + todos[i] + ' ' + '<button class="remove-item" id="' + i + '">Remove</button><hr></li>';
    }
    // end html
    html += '</ul>';

    document.getElementById("todos").innerHTML = html;

    // remove button: retrieve all the Remove buttons and iterate over them to add event listeners that invoke the remove method on an individual Remove button, upon click or enter
    let removeButtons = document.getElementsByClassName("remove-item");
    for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener("click", remove);
    }
}

// when the user clicks on a remove button, remove it from a new array, set the new array in localStorage and display it
function remove() {
    let newTodos = getTodos();
    newTodos.splice(this.id, 1);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    show();
}

// add item: trigger on click and on enter
document.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        add();
    } else {
        document.getElementById("add-todo-item").addEventListener("click", add);
    }
});