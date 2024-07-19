"use client"
import { ITask, deleteTaskAsync, getAllTaskAsync, selectStatus, selectTask, updateTaskAsync } from '@/store/task/taskSlice';
import TaskItem from './TaskItem';

// styles
import styles from './TaskList.module.css';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import EditForm from './EditForm';


const TaskList = () => {

  const dispatch = useAppDispatch();
  const listTask = useAppSelector(selectTask);
  const status = useAppSelector(selectStatus);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<ITask>({ idTask: 0, libTask: "" });
  const [previousFocusEl, setPreviousFocusEl] = useState<any>(null);

  const closeEditMode = () => {
    setIsEditing(false);
    previousFocusEl && previousFocusEl.focus();
  }
  const enterEditMode = (task: ITask) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
  }

  const updateTask = (data: ITask) => {
    dispatch(updateTaskAsync(data))
    closeEditMode()
  }

  const getAllTask = () => {
    dispatch(getAllTaskAsync(""))
  }
  useEffect(() => {
    getAllTask()
  }, [])

  const deleteTask = (idTask: number) => {
    dispatch(deleteTaskAsync(idTask))
  }
  return (
    <div>
      {
        status === "loading"
          ?
          <div>Loading...</div>
          :
          <>
            {
              isEditing && (
                <EditForm
                  editedTask={editedTask}
                  updateTask={updateTask}
                  closeEditMode={closeEditMode}
                />
              )
            }
            <ul className={styles.tasks}>
              {listTask.map(task => (
                <TaskItem
                  key={task.idTask}
                  task={task}
                  deleteTask={deleteTask}
                  toggleTask={() => null}
                  enterEditMode={enterEditMode}
                />
              ))
              }
            </ul>
          </>
      }

    </div>
  )
}
export default TaskList