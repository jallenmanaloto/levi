import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Task as TTask } from "../lib/types.ts";
import Task from "./Task";

export default function TaskList() {
  const [tasks, setTasks] = useState<TTask[] | null>(null);

  const fetchTasks = async () => {
    try {
      const newTask = await invoke<TTask[]>('get_tasks_command');
      setTasks(newTask);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <>
      {tasks !== null ? tasks.map((task, key: number) => {
        return (
          <Task key={key} task={task} />
        )
      }) : 'no task found'}
    </>
  )
}
