import { invoke } from "@tauri-apps/api/core";
import { Task } from "../lib/types";

export const fetchTasks = async (): Promise<Task[]> => {
  return await invoke<Task[]>('get_tasks_command');
}

