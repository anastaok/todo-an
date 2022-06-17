import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./Todo.scss";

const Todo = () => {
  const API = "https://jsonplaceholder.typicode.com/todos?_start=0&_limit=10";

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    axios.get(API).then((result) => {
      setTodos(result.data);
    });
  }, []);

  const inputText = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const addTask = () => {
    if (inputValue) {
      const id = todos[todos.length - 1].id + 1;

      const newTask = {
        userId: "",
        id: id,
        title: inputValue,
        completed: false,
      };

      setTodos([...todos, newTask]);
      setInputValue("");
    }
  };

  const deleteTask = (id) => {
    const filterTask = todos.filter((task) => task.id !== id);

    setTodos(filterTask);
  };

  const checkTask = (index) => {
    const copy = [...todos];
    copy[index].completed = !copy[index].completed;

    setTodos(copy);
  };

  return (
    <div className="mainContainer">
      <div className="title">Anasta's Todo List</div>

      <div className="upperBlock">
        <input
          onChange={inputText}
          value={inputValue}
          className="inputTask"
          placeholder="Enter task text..."
        ></input>
        <button onClick={addTask} className="addTask">
          Add Task
        </button>
      </div>

      <div className="tasks">
        {todos.length ? (
          todos.map((task, index) => {
            return (
              <div key={task.id} className="task">
                <div
                  className={`${task.completed ? "checkTask" : ""} taskTitle`}
                >
                  <input
                    value={task.completed}
                    onChange={() => checkTask(index)}
                    type="checkbox"
                    className="checkbox"
                  />
                  <div>
                    {index + 1}&#46;&nbsp;
                    {task.title}
                  </div>
                </div>
                <div
                  onClick={() => {
                    deleteTask(task.id);
                  }}
                  className="deleteTask"
                >
                  &#10006;
                </div>
              </div>
            );
          })
        ) : (
          <div className="withoutTask">Haven't tasks yet</div>
        )}
      </div>
    </div>
  );
};

export default Todo;
