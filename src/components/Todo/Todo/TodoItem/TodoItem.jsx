import React from "react";
import "./TodoItem.scss";

const TodoItem = ({ task, checkTask, index, deleteTask }) => {
  return (
    <div key={task.id} className="task">
      <div className={`${task.completed ? "checkTask" : ""} taskTitle`}>
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
};

export default TodoItem;
