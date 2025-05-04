export type Note = {
  name: string;
  createdAt: string;
};

export type Task = {
  id: number;
  title: string;
  created_at: string
  notes: Note[];
  status: TaskStatus;
};

export type TaskStyle = {
  background: string;
  border: string;
};

export enum TaskStatus {
  TODO = 'todo',
  ONGOING = 'ongoing',
  DONE = 'done'
};
