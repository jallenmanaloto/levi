import Task from "./Task";
import { useFetchTasks } from "../data/task.ts";

export default function TaskList() {
  const { data: tasks } = useFetchTasks();

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
