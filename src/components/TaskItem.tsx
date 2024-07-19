
// styles
import { ITask } from '@/store/task/taskSlice';
import styles from './TaskItem.module.css';

// Library imports
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

interface TaskItemProps {
  task: ITask;
  enterEditMode: (x: ITask) => void;
  deleteTask: (x: number) => void;
  toggleTask: (x: number) => void;
}
const TaskItem: React.FC<TaskItemProps> = ({ task, deleteTask, toggleTask, enterEditMode }) => {

  return (
    <li className={styles.task}>
      <div className={styles["task-group"]}>
     
        <label
          className={styles.label}
        >
          {task.libTask}
         
        </label>
      </div>
      <div className={styles["task-group"]}>
        <button
          className='btn'
          aria-label={`Update ${task.libTask} Task`}
          onClick={() => enterEditMode(task)}
        >
          <PencilSquareIcon width={24} height={24} />
        </button>

        <button
          className={`btn ${styles.delete}`}
          aria-label={`Delete ${task.libTask} Task`}
          onClick={() => deleteTask(task.idTask)}
        >
          <TrashIcon width={24} height={24} />
        </button>
      </div>
    </li>
  )
}
export default TaskItem