import TaskFilter from "./TaskFilter";

export default function Header() {
  return (
    <div className="w-full h-12 flex background-pill rounded-full">
      <TaskFilter />
    </div>
  )
}
