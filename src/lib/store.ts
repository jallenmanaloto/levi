import { create } from 'zustand';

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
