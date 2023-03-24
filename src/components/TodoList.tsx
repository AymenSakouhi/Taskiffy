import React from "react";
import "./styles.css";
import { todo } from "./model";
import SingleTodo from "./SingleTodo";
import { Actions, todoActionType } from "../App";

interface TodoListProps {
  todos: todo[];
  dispatch: React.Dispatch<Actions>;
}

const TodoList: React.FC<TodoListProps> = ({ todos, dispatch }) => {
  return (
    <>
      {todos.map((todo) => (
        <SingleTodo
          key={todo.id}
          todo={todo}
          todos={todos}
          dispatch={dispatch}
        />
      ))}
    </>
  );
};

export default TodoList;
