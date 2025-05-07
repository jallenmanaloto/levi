import Find from "../Search/index.tsx";
import TaskFilter from "./TaskFilter.tsx"

export default function Header() {
  return (
    <div className="w-full h-12 flex justify-between items-center background-pill rounded-full">
      <TaskFilter />
      <div className="flex items-center space-x-3">
        <Find />
        {/*
        <Voice />
        */}
      </div>
    </div>
  )
}
