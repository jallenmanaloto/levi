import { useState } from "react";
import { useFilterStore } from "../../lib/store";

export default function TaskFilter() {
  const categories = ['Tasks', 'Ongoing', 'Done'];
  const { total, ongoingCount, doneCount } = useFilterStore();
  const [activeCategory, setActiveCategory] = useState<string>('Tasks');

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
            onClick={() => setActiveCategory(category)}
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
