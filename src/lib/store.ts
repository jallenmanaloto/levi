import { create } from 'zustand';
import { Task } from './types';

export type FilterStore = {
  doneCount: number;
  total: number;
  todoCount: number;
  ongoingCount: number;
  setTodoCount: (todoCount: number) => void;
  setDoneCount: (doneCount: number) => void;
  setOngoingCount: (ongoingCount: number) => void;
  setTotal: (total: number) => void;
}
export const useFilterStore = create<FilterStore>((set) => ({
  doneCount: 0,
  ongoingCount: 0,
  total: 0,
  todoCount: 0,
  setDoneCount: (doneCount: number) => set(() => ({ doneCount })),
  setTodoCount: (todoCount: number) => set(() => ({ todoCount })),
  setOngoingCount: (ongoingCount: number) => set(() => ({ ongoingCount })),
  setTotal: (total: number) => set(() => ({ total })),
}));

export type TaskStore = {
  tasks: Task[] | undefined;
  filteredTasks: Task[] | undefined;
  setFilteredTasks: (filteredTasks: Task[] | undefined) => void;
  setTasks: (tasks: Task[] | undefined) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: undefined,
  filteredTasks: undefined,
  setFilteredTasks: (filteredTasks: Task[] | undefined) => set(() => ({ filteredTasks })),
  setTasks: (tasks: Task[] | undefined) => set(() => ({ tasks })),
}));

export type NoteVisibilityState = {
  visibleNotes: Record<number, boolean>;
  setNoteVisibility: (taskId: number, isVisible: boolean) => void;
  isNoteVisible: (taskId: number) => boolean;
  collapseAllNotes: () => void;
}

export const useNoteVisibilityStore = create<NoteVisibilityState>((set, get) => ({
  visibleNotes: {},

  setNoteVisibility: (taskId: number, isVisible: boolean) =>
    set((state) => ({
      visibleNotes: {
        ...state.visibleNotes,
        [taskId]: isVisible
      }
    })),

  isNoteVisible: (taskId: number) => {
    return get().visibleNotes[taskId] || false;
  },

  collapseAllNotes: () => set({ visibleNotes: {} })
}));
