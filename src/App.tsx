import { useState, useReducer } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { todo } from "./components/model";
import TodoList from "./components/TodoList";

export type todoState = todo[];

export enum todoActionType {
  add = "add",
  remove = "remove",
  edit = "edit",
  done = "done",
  default = "default",
}

export type Actions =
  | {
      type: todoActionType.add;
      payload: string;
    }
  | {
      type: todoActionType.remove;
      payload: number;
    }
  | {
      type: todoActionType.edit;
      payload: { id: number; todoText: string };
    }
  | {
      type: todoActionType.done;
      payload: number;
    }
  | {
      type: todoActionType.default;
      payload?: todo;
    };

const reducer = (state: todoState, action: Actions) => {
  switch (action.type) {
    case todoActionType.add:
      return [
        ...state,
        { id: Date.now(), todoText: action.payload, isDone: false },
      ];

    case todoActionType.remove:
      return state.filter((todo: todo) => todo.id !== action.payload);
    case todoActionType.edit:
      return state.map((todo: todo) =>
        todo.id === action.payload.id
          ? { ...todo, todoText: action.payload.todoText }
          : todo
      );
    case todoActionType.done:
      return state.map((todo: todo) =>
        todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
      );
    case todoActionType.default:
      return state;
  }
};

const App: React.FC = () => {
  const [todoText, setTodoText] = useState<string>("");
  // const [todos, setTodos] = useState<todo[]>([]);
  const [state, dispatch] = useReducer(reducer, []);

  const handleAdd = (e: React.FormEvent): void => {
    e.preventDefault();

    if (todoText === "") return;
    if (todoText) {
      dispatch({ payload: todoText, type: todoActionType.add });
      setTodoText("");
    }
  };

  return (
    <div className="App">
      <span className="heading">Taskiffy</span>
      <InputField
        todoText={todoText}
        setTodoText={setTodoText}
        handleAdd={handleAdd}
      />
      <TodoList todos={state} dispatch={dispatch} />
    </div>
  );
};

export default App;

//https://www.youtube.com/watch?v=FJDVKeh7RJI&ab_channel=freeCodeCamp.org
//Following this one here. 37:55
