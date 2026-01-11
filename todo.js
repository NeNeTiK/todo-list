let todos = JSON.parse(localStorage.getItem("myTodos")) || [];
const save = () => localStorage.setItem("myTodos", JSON.stringify(todos));
const ulElem = document.querySelector("#todo-list");
const render = () => {
  ulElem.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.innerHTML = `<span ${
      todo.completed ? 'style="text-decoration: line-through"' : ""
    }>${todo.text}</span>`;
    li.addEventListener("click", () => {
      todo.completed = !todo.completed;
      render();
      save();
    });
    const clearBtn = document.createElement("button");
    clearBtn.classList.add("delete-btn");
    clearBtn.textContent = "X";
    clearBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      todos = todos.filter((t) => todo.id !== t.id);
      render();
      save();
    });
    li.appendChild(clearBtn);
    ulElem.appendChild(li);
  });
};

const inputField = document.querySelector("#todo-input");

document.addEventListener("DOMContentLoaded", (event) => {
  render();
  const button = document.querySelector("#add-btn");
  button.addEventListener("click", () => {
    console.log("Button clicked!");
    const inputValue = inputField.value;
    if (inputValue == "") {
      return;
    }
    const newLiElem = { id: Date.now(), text: inputValue, completed: false };
    todos.push(newLiElem);
    save();
    inputField.value = "";
    render();
  });
});
