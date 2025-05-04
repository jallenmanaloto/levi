import TaskFilter from "./TaskFilter";
import Voice from "./Voice";

export default function Header() {
  return (
    <div className="w-full h-12 flex justify-between items-center background-pill rounded-full">
      <TaskFilter />
      <Voice />
    </div>
  )
}
