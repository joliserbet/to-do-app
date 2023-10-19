import { createContext, useContext, useState } from "react";
import {
  createTasksRequest,
  getTasksRequest,
  deleteTasksRequest,
} from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const response = await getTasksRequest();
    try {
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task) => {
    const response = await createTasksRequest(task);
    console.log(response);
  };

  const deleteTask = async (id) => {
    try {
      const response = await deleteTasksRequest(id);
      if (response.status === 204)
        setTasks(tasks.filter((task) => task._id !== id));
      else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
