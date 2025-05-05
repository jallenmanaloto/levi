import { useEffect, useState } from "react";
import { useFilterStore, useNoteVisibilityStore, useTaskStore } from "../../lib/store";
import { TaskStatus } from "../../lib/types";

export default function TaskFilter() {
  const { tasks, setFilteredTasks } = useTaskStore();
  const { collapseAllNotes } = useNoteVisibilityStore();
  const categories = ['Tasks', 'Ongoing', 'Done'];
  const { total, ongoingCount, doneCount } = useFilterStore();
  const [activeCategory, setActiveCategory] = useState<string>('Tasks');

  // Map category to TaskStatus
  const categoryToStatus: Record<string, TaskStatus | null> = {
    Tasks: null,
    Ongoing: TaskStatus.ONGOING,
    Done: TaskStatus.DONE,
  };

  const handleCategoryChange = (category: string) => {
    collapseAllNotes();
    setActiveCategory(category);
  }

  useEffect(() => {
    if (!tasks) return undefined;

    const status = categoryToStatus[activeCategory];
    const newFilteredTasks = status
      ? tasks.filter((task) => task.status === status)
      : tasks;
    setFilteredTasks(newFilteredTasks);
  }, [activeCategory, tasks]);

  return (
    <div className="h-12 flex items-center base-text">
      {categories.map((category: string, key: number) => {
        let count = 0;
        if (category === 'Tasks') {
          count = total;
        }

        if (category === 'Ongoing') {
          count = ongoingCount;
        }

        if (category === 'Done') {
          count = doneCount;
        }

        const isActive = activeCategory === category;
        return (
          <div
            onClick={() => handleCategoryChange(category)}
            className={`w-28 h-7 ml-4 base-text flex justify-center items-center ${isActive ? 'bg-neutral-200/10' : 'bg-stone-800/40'} rounded-full cursor-pointer`}
            key={key}
          >
            <h2 className={`${isActive ? 'text-gray-100' : ''} text-xs px-2`}>
              {category} <span className={`${isActive ? 'text-green-200' : 'text-green-200/20'}`}>({count})</span>
            </h2>
          </div>
        )
      })}
    </div>
  )
}
