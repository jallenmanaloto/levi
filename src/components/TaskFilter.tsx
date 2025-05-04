import { useState } from "react";

export default function TaskFilter() {
  const categories = ['To do', 'Ongoing', 'Done'];
  const [activeCategory, setActiveCategory] = useState<string>('To do');

  return (
    <div className="h-12 flex items-center">
      {categories.map((category: string, key: number) => {
        const isActive = activeCategory === category;
        return (
          <div
            onClick={() => setActiveCategory(category)}
            className={`w-28 h-3/4 ml-4 flex justify-center items-center ${isActive ? 'bg-neutral-100/5' : 'bg-stone-800/40'} rounded-full cursor-pointer`}
            key={key}
          >
            <h2 className="text-xs text-gray-100 px-2">
              {category}: (100)
            </h2>
          </div>
        )
      })}
    </div>
  )
}
