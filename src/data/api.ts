import { invoke } from "@tauri-apps/api/core";
import { Task, TaskStatus } from "../lib/types";

export const fetchTasks = async (): Promise<Task[]> => {
  return await invoke<Task[]>('get_tasks_command');
}

export const addTask = async ({ title, status }: { title: string, status: TaskStatus }): Promise<void> => {
  return await invoke('add_task_command', { title, status });
}

export const updateTask = async ({ id, title, status }: { id: number, title: string, status: TaskStatus }): Promise<void> => {
  return await invoke('update_task_command', { id, newTitle: title, newStatus: status });
}

export const deletTask = async ({ id }: { id: number }): Promise<void> => {
  return await invoke('delete_task_command', { id });
}
