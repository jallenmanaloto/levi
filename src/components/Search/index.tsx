import { Search, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { useTaskStore } from '../../lib/store';

export default function Find() {
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { tasks, setFilteredTasks } = useTaskStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);

    setTimeout(() => {
      if (tasks) {
        const newFilteredTasks = tasks.filter((task) => task.title.toLowerCase().includes(newSearch.toLowerCase()));
        setFilteredTasks(newFilteredTasks);
      }
    }, 400)
  }

  const handleCancelSearch = () => {
    inputRef.current?.blur();
    setSearch('');
    setFilteredTasks(tasks);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleCancelSearch();
    }
  }

  return (
    <div className="w-64 h-7 flex space-x-3 items-center mr-5 bg-stone-800/40 rounded-full">
      <input
        ref={inputRef}
        className="flex-1 pl-4 text-xs text-gray-100/50 outline-none cursor-text"
        type='text'
        value={search}
        placeholder='Find task'
        onChange={(e) => handleSearch(e)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      {document.activeElement === inputRef.current
        ? <X onClick={handleCancelSearch} className="text-gray-200/50 mr-4 cursor-pointer" size={14} />
        : <Search className="text-gray-200/50 mr-4" size={14} />
      }

    </div>
  )
}
