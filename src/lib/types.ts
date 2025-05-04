export type Note = {
  name: string;
  createdAt: string;
};

export type Task = {
  name: string;
  createdAt: string
  notes: Note[];
  status: TaskStatus;
};

export type TaskStyle = {
  background: string;
  border: string;
};

export enum TaskStatus {
  TODO = 'To do',
  ONGOING = 'Ongoing',
  DONE = 'Done'
};
