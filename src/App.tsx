import { useState, useReducer } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { todo } from "./components/model";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

export type todoState = {
  todos: todo[];
  completedTodos: todo[];
};

export enum todoActionType {
  add = "add",
  remove = "remove",
  edit = "edit",
  done = "done",
  default = "default",
  complete = "complete",
  todos = "todos",
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
    }
  | {
      type: todoActionType.complete;
      payload: todo[];
    }
  | {
      type: todoActionType.todos;
      payload: todo[];
    };

export const reducer = (state: todoState, action: Actions) => {
  switch (action.type) {
    case todoActionType.add:
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), todoText: action.payload, isDone: false },
        ],
      };

    case todoActionType.remove:
      return {
        ...state,
        todos: state.todos.filter((todo: todo) => todo.id !== action.payload),
      };
    case todoActionType.edit:
      return {
        ...state,
        todos: state.todos.map((todo: todo) =>
          todo.id === action.payload.id
            ? { ...todo, todoText: action.payload.todoText }
            : todo
        ),
      };
    case todoActionType.done:
      return {
        ...state,
        todos: state.todos.map((todo: todo) =>
          todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
        ),
      };
    case todoActionType.complete:
      return {
        ...state,
        completedTodos: action.payload,
      };
    case todoActionType.todos:
      return {
        ...state,
        todos: action.payload,
      };
    case todoActionType.default:
      return state;
  }
};

const App: React.FC = () => {
  const [todoText, setTodoText] = useState<string>("");
  const [state, dispatch] = useReducer(reducer, {
    todos: [],
    completedTodos: [],
  });

  const handleAdd = (e: React.FormEvent): void => {
    e.preventDefault();

    if (todoText === "") return;
    if (todoText) {
      dispatch({ payload: todoText, type: todoActionType.add });
      setTodoText("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    console.log(destination, source);
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = state.todos,
      complete = state.completedTodos;

    if (source.droppableId === "todosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "todosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    dispatch({ type: todoActionType.complete, payload: complete });
    dispatch({ type: todoActionType.todos, payload: active });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskiffy</span>
        <InputField
          todoText={todoText}
          setTodoText={setTodoText}
          handleAdd={handleAdd}
        />
        <TodoList state={state} dispatch={dispatch} />
      </div>
    </DragDropContext>
  );
};

export default App;

//https://www.youtube.com/watch?v=FJDVKeh7RJI&ab_channel=freeCodeCamp.org
//Following this one here. 37:55
