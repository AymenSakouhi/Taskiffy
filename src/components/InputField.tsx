import React from "react";
import "./styles.css";

interface InputFieldProps {
  todoText: string;
  setTodoText: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  todoText,
  setTodoText,
  handleAdd,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <form className="input" action="">
      <input
        ref={inputRef}
        type="text"
        placeholder="Add a task"
        className="input__box"
        value={todoText}
        onChange={(e) => {
          setTodoText(e.target.value);
        }}
      />
      <button
        className="input_submit"
        type="submit"
        onClick={(e) => {
          handleAdd(e);
          inputRef.current?.blur();
        }}
      >
        Go
      </button>
    </form>
  );
};

export default InputField;
