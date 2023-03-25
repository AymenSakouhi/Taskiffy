import React from "react";
import "./styles.css";
import SingleTodo from "./SingleTodo";
import { Actions, todoState } from "../App";
import { Droppable } from "react-beautiful-dnd";

interface TodoListProps {
  state: todoState;
  dispatch: React.Dispatch<Actions>;
}

const TodoList: React.FC<TodoListProps> = ({ state, dispatch }) => {
  return (
    <div className="container">
      <Droppable droppableId="todosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active tasks</span>
            {state.todos.map((todo, index) => (
              <SingleTodo
                index={index}
                key={todo.id}
                todo={todo}
                todos={state.todos}
                dispatch={dispatch}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="todosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver ? "dragcomplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {state.completedTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                key={todo.id}
                todo={todo}
                todos={state.completedTodos}
                dispatch={dispatch}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
