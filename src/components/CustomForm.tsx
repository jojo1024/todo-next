"use client"
import { useAppDispatch } from '@/store/hooks';
import { addTaskAsync } from '@/store/task/taskSlice';
// library imports
import { PlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

// interface CustomFormProps {
//   addTask: (x: string) => void;
// }


const CustomForm = () => {

  const dispatch = useAppDispatch();
  const [task, setTask] = useState("");

  const handleClick = (e: any) => {
    e.preventDefault();
    dispatch(addTaskAsync(task))
    setTask("")
  }

  return (
    <form
      className="todo"
    // onClick={handleFormSubmit}
    >
      <div className="wrapper">
        <input
          type="text"
          id="task"
          className="input"
          value={task}
          onInput={(e: any) => setTask(e.target.value)}
          required
          autoFocus
          maxLength={60}
          placeholder="Entrer la tâche"
        />
        <label
          htmlFor="task"
          className="label"
        >Entrer la tâche</label>
      </div>
      <button
        className="btn"
        aria-label="Add Task"
        type="submit"
        onClick={handleClick}
      >
        <PlusIcon />
      </button>
    </form>
  )
}
export default CustomForm