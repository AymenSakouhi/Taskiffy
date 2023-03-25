import React, { useState, useRef, useEffect } from "react";
import { todo } from "./model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Actions, todoActionType } from "../App";
import { Draggable } from "react-beautiful-dnd";

interface SingleTodoProps {
  todo: todo;
  todos: todo[];
  dispatch: React.Dispatch<Actions>;
  index: number;
}

const SingleTodo: React.FC<SingleTodoProps> = ({
  todo,
  todos,
  dispatch,
  index,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.todoText);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleDone = (id: number) => {
    dispatch({ type: todoActionType.done, payload: id });
  };

  const handleDelete = (id: number) => {
    dispatch({ type: todoActionType.remove, payload: id });
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    dispatch({
      type: todoActionType.edit,
      payload: { id: id, todoText: editText },
    });
    setEdit(false);
  };
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}}`}
          onSubmit={(e) => {
            handleEdit(e, todo.id);
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              value={editText}
              type="text"
              ref={inputRef}
              onChange={(e) => {
                setEditText(e.target.value);
              }}
              className="todos__single--text"
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todoText}</s>
          ) : (
            <span className="todos__single--text">{todo.todoText}</span>
          )}

          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
