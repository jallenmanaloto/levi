import Task from "./Task";
import { useFetchTasks } from "../data/task.ts";
import { useFilterStore, useTaskStore } from "../lib/store.ts";
import { useEffect } from "react";
import { TaskStatus } from "../lib/types.ts";

export default function TaskList() {
  const { setDoneCount, setOngoingCount, setTodoCount, setTotal } = useFilterStore();
  const { filteredTasks, tasks, setTasks } = useTaskStore();
  const { data } = useFetchTasks();

  useEffect(() => {
    if (tasks) {
      const doneCount = tasks.filter(task => task.status === TaskStatus.DONE).length;
      const ongoingCount = tasks.filter(task => task.status === TaskStatus.ONGOING).length;
      const todoCount = tasks.filter(task => task.status === TaskStatus.TODO).length;

      setTasks(data);
      setTotal(tasks.length);
      setTodoCount(todoCount);
      setDoneCount(doneCount);
      setOngoingCount(ongoingCount);
    }
  }, [data]);

  return (
    <>
      {filteredTasks ? filteredTasks.map((task, key: number) => {
        return (
          <Task key={key} task={task} />
        )
      }) : 'no task found'}
    </>
  )
}
