import { Task, TaskStatus } from "../../lib/types"
import { useUpdateTask } from "../../data/task";

export default function StatusDropdown({ task, setStatus }: { task: Task, setStatus: (status: TaskStatus) => void }) {
  const statusLabels: Record<TaskStatus, string> = {
    [TaskStatus.TODO]: "To do",
    [TaskStatus.ONGOING]: "Ongoing",
    [TaskStatus.DONE]: "Done"
  };

  const status = task.status;

  const updateTask = useUpdateTask();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as TaskStatus;
    setStatus(newStatus);
    updateTask.mutate({
      id: task.id,
      title: task.title,
      status: newStatus
    });
  }

  return (
    <>
      <select
        className={`bg-transparent text-xs outline-none appearance-none cursor-pointer text-center
        ${status === TaskStatus.TODO ? 'text-indigo-500/37'
            : status === TaskStatus.ONGOING ? 'text-yellow-400/50'
              : status === TaskStatus.DONE ? 'text-green-800'
                : ''}`}
        value={status}
        onChange={handleChange}
      >
        {Object.entries(statusLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </>
  )
}
