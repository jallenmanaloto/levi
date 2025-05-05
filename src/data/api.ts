import { invoke } from "@tauri-apps/api/core";
import { Note, Task, TaskStatus } from "../lib/types";

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

export const addNote = async ({ note, taskId }: { note: string, taskId: number }): Promise<void> => {
  return await invoke('add_note_command', { note, taskId: taskId });
}

export const fetchNotes = async ({ taskId }: { taskId: number }): Promise<Note[]> => {
  return await invoke<Note[]>('get_notes_command', { taskId });
}
