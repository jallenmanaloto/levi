import Task from "./Task";
import { useFetchTasks } from "../data/task.ts";
import { useFilterStore } from "../lib/store.ts";
import { useEffect } from "react";
import { TaskStatus } from "../lib/types.ts";

export default function TaskList() {
  const { setDoneCount, setOngoingCount, setTodoCount, setTotal } = useFilterStore();
  const { data: tasks } = useFetchTasks();

  useEffect(() => {
    if (tasks) {
      const doneCount = tasks.filter(task => task.status === TaskStatus.DONE).length;
      const ongoingCount = tasks.filter(task => task.status === TaskStatus.ONGOING).length;
      const todoCount = tasks.filter(task => task.status === TaskStatus.TODO).length;

      setTotal(tasks.length);
      setTodoCount(todoCount);
      setDoneCount(doneCount);
      setOngoingCount(ongoingCount);
    }
  }, [tasks]);

  return (
    <>
      {tasks ? tasks.map((task, key: number) => {
        return (
          <Task key={key} task={task} />
        )
      }) : 'no task found'}
    </>
  )
}
