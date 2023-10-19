import { useTasks } from "../context/TasksContext";


function TaskCard({ task }) {
  
  const { deleteTask } = useTasks();
  return (
    <div className="flex flex-col w-60 h-60 gap-1 bg-zinc-600 dark:bg-slate-500 p-4 rounded-md">
      <header className="flex justify-between">
        <h3 className="p-1 w-50 h-fit w-full font-bold rounded">
          {task.task}
        </h3>
        <div className="flex gap-2">
          <button onClick={()=>{
            deleteTask(task._id);
          }}>🗑️</button>
          <button>✏️</button>
        </div>
      </header>
      <p className="p-1 w-50 h-full w-full overflow-x-auto bg-zinc-700 dark:bg-slate-600 rounded">
        {task.description}
      </p>
      <p>{new Date(task.date).toLocaleDateString()}</p>
    </div>
  );
}

export default TaskCard;
