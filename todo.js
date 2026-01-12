let todos = JSON.parse(localStorage.getItem("myTodos")) || [];
const saveToDataBase = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem("myTodos", JSON.stringify(todos));
      resolve("Data saved succesfully!");
      console.log("text");
    }, 2000);
  });
};
const ulElem = document.querySelector("#todo-list");
const render = () => {
  ulElem.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.innerHTML = `<span ${
      todo.completed ? 'style="text-decoration: line-through"' : ""
    }>${todo.text}</span>`;
    li.addEventListener("click", async () => {
      todo.completed = !todo.completed;
      render();
      await saveToDataBase();
    });
    const clearBtn = document.createElement("button");
    clearBtn.classList.add("delete-btn");
    clearBtn.textContent = "X";
    clearBtn.addEventListener("click", async (event) => {
      event.stopPropagation();
      todos = todos.filter((t) => todo.id !== t.id);
      render();
      await saveToDataBase();
    });
    li.appendChild(clearBtn);
    ulElem.appendChild(li);
  });
};

const inputField = document.querySelector("#todo-input");

document.addEventListener("DOMContentLoaded", (event) => {
  render();
  const button = document.querySelector("#add-btn");
  button.addEventListener("click", async () => {
    console.log("Button clicked!");
    const inputValue = inputField.value.trim();
    if (inputValue == "") {
      alert("Enter the text!");
      return;
    }
    try {
      button.disabled = true;
      button.textContent = "Saving...";

      const newLiElem = { id: Date.now(), text: inputValue, completed: false };
      todos.push(newLiElem);

      await saveToDataBase();

      inputField.value = "";
      render();
    } catch (error) {
      console.error("Save error:");
    } finally {
      button.disabled = false;
      button.textContent = "Add";
    }
  });
});
