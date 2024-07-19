"use client"
import { useState, useEffect } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid'
import { ITask, updateTaskAsync } from '@/store/task/taskSlice';
import { useAppDispatch } from '@/store/hooks';

interface EditFormProps {
  editedTask: ITask;
  updateTask: (x: ITask) => void;
  closeEditMode: () => void;
}
const EditForm: React.FC<EditFormProps> = ({ editedTask, updateTask, closeEditMode }) => {
  const dispatch = useAppDispatch();

 
  const [task, setTask] = useState(editedTask.libTask);

  useEffect(()=> {
    const closeModalIfEscaped = (e:any) => {
      e.key === "Escape" && closeEditMode();
    }

    window.addEventListener('keydown', closeModalIfEscaped)

    return () => {
      window.removeEventListener('keydown', closeModalIfEscaped)
    }
  }, [closeEditMode])

  const handleOnclick = (e:any) => {
    e.preventDefault();
    dispatch(updateTaskAsync({idTask: editedTask.idTask, libTask: task}))
    closeEditMode()
    // updateTask({idTask: editedTask.idTask, libTask: task})
  }

  return (
    <div
      role="dialog"
      aria-labelledby="editTask"
      onClick={(e) => {e.target === e.currentTarget && closeEditMode()}}
      >
      <form
        className="todo"
        // onSubmit={handleFormSubmit}
        >
        <div className="wrapper">
          <input
            type="text"
            id="editTask"
            className="input"
            value={task}
            onInput={(e:any) => setTask(e.target.value)}
            required
            autoFocus
            maxLength={60}
            placeholder="Update Task"
          />
          <label
            htmlFor="editTask"
            className="label"
          >Update Task</label>
        </div>
        <button
          className="btn"
          aria-label={`Confirm edited task to now read ${task}`}
          type="submit"
          onClick={handleOnclick}
          >
          <CheckIcon strokeWidth={2} height={24} width={24} />
        </button>
      </form>
    </div>
  )
}
export default EditForm