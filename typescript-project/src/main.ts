/**
 * NOTE to self
 * Make a module and import the functions from the module
 * Seperate the functions into different files
 * Logical grouping of functions - for example, all functions related to adding a todo item can be in one file
 * 
 */
import './style.css';

// Step 1: Define the Todo interface
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Step 2: Initialize an empty array to store todos
let todos: Todo[] = [];

// Step 3: Get references to the HTML elements
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;   
const todoList = document.getElementById('todo-list') as HTMLUListElement;  

// Step 4: Function to add a new todo
// Function to add a new todo: This function creates a new todo object and adds it to the array.
const addTodo = (text: string): void => {
  const newTodo: Todo = {
    id: Date.now(),
    title: text,
    completed: false,
  };

  todos.push(newTodo);
  console.log("Todo added: ", todos);
  renderTodos();
};

// Step 5: Function to render the list of todos
// Function to render the list of todos: This function updates the DOM to display the current list of todos.
const renderTodos = (): void => {
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item'; 
    li.innerHTML = `
      <span>${todo.title}</span>
      <button> Remove </button>
      <button id="editBtn"> Edit </button>
      <button class="completedBtn"> Completed </button> 
    `;
    addRemoveButtonListener(li, todo.id);
    addEditButtonListener(li, todo.id);
    addCompletedButtonListener(li, todo.id);
    todoList.appendChild(li); 
    buttonCondition();

    const completedButton = li.querySelector('.completedBtn') as HTMLButtonElement;
    if (todo.completed) {
      changeCompletedColor(completedButton);
    }
  });
};

renderTodos();

// Step 6: Event listener for the form submission
// Event listener for the form submission: This listener handles the form submission, adds the new todo, and clears the input field.
todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault(); 
  const text = todoInput.value.trim(); 
  if (text !== '') { 
    addTodo(text);
    todoInput.value = ''; 
  }
});

// Step 7: Function to removes all a todo by ID
// Function to add event listener to the remove button - this function has an callback function that removes the todo item from the array.
const addRemoveButtonListener = (li: HTMLLIElement, id: number): void => {
  const removeButton = li.querySelector('button');
  removeButton?.addEventListener('click', () => removeTodo(id)); // We have an optional chaining operator here to avoid errors if the button is not found - for example, if the button is removed from the DOM.
};

// Step 8: Function to remove a todo by ID
// Function to remove a todo by ID: This function removes a todo from the array based on its ID.
const removeTodo = (id: number): void => {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}; 


// We have to access the li of the todos elements with their id. 
// When accesing the id can we add a function with a button ("Edit the todo")
// We can add a function that when the button is clciked it access the id and it changes the value of the text of the element

const addEditButtonListener = ( li: HTMLLIElement, id: number) => {
  const editButton = li.querySelector('#editBtn')
  editButton?.addEventListener('click', () => editTodo(id))
}

const editTodo = (id: number) => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    const text = prompt("edit todo", todo.title)
    if (text) {
      todo.title = text
      renderTodos()
    } 
  }
}

const initializeColorPicker = (): void => {
  const colorPicker = document.getElementById("colorPicker") as HTMLInputElement;
  if (colorPicker) {
    colorPicker.addEventListener("input", (e: Event) => {
      const target = e.target as HTMLInputElement;
      changeBackgroundColor(target.value) 
    })
  }
  else{console.error('Color picker element not found')}
}

const changeBackgroundColor = (color:string):void => {
  document.body.style.backgroundColor = color
}

document.addEventListener('DOMContentLoaded', () => {
  initializeColorPicker()
})


// Option 1: Add a button to toggle the completed status of a todo item

const editCompletedButton = (id: number): void => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed; // Toggle the completed status
    renderTodos(); 
  }
};

const addCompletedButtonListener = (li: HTMLLIElement, id: number): void => {
  const completedButton = li.querySelector('.completedBtn') as HTMLButtonElement;
  completedButton?.addEventListener('click', () => editCompletedButton(id));
};

const completedColor = "green";

const changeCompletedColor = (completedButton: HTMLButtonElement): void => {
  completedButton.style.backgroundColor = completedColor;
};



//Option 2: Add a button to clear all completed todos
const removeAllTodos = (): void => {
  todos = [];
  renderTodos();
  buttonCondition();
};

const removeAllTodosButton = document.getElementById('remove-all-todos') as HTMLButtonElement;
const buttonCondition = () => {
  if(todos.length === 0 && removeAllTodosButton) {
    removeAllTodosButton.style.display = 'none';
  }
  else if(todos.length > 0 && removeAllTodosButton) {
    removeAllTodosButton.style.display = 'block';
    removeAllTodosButton.addEventListener('click', removeAllTodos);
  }
}

buttonCondition();


// Option 8: Add a search input field to filter todos based on the search query

const searchButton = document.getElementById('search') as HTMLInputElement;
searchButton.addEventListener("input", (e: Event) => {
  const target = e.target as HTMLInputElement;
  const value = target.value.toLowerCase();
  const filteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(value)
  );
  renderFilteredTodos(filteredTodos);
});


const renderFilteredTodos = (filteredTodos: Todo[]): void => {
  todoList.innerHTML = ''; // Clear the current list

  filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item'; 
    li.innerHTML = `
      <span>${todo.title}</span>
      <button> Remove </button>
      <button id="editBtn"> Edit </button>
      <button class="completedBtn"> Completed </button> 
    `;
    
    addRemoveButtonListener(li, todo.id);
    addEditButtonListener(li, todo.id);
    addCompletedButtonListener(li, todo.id);
    
    todoList.appendChild(li);

    const completedButton = li.querySelector('.completedBtn') as HTMLButtonElement;
    if (todo.completed) {
      changeCompletedColor(completedButton);
    }
  });
};