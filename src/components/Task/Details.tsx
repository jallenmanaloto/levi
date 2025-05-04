import { Check, ChevronDown, ChevronUp, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Task, TaskStatus } from '../../lib/types';
import { useUpdateTask } from '../../data/task';
import { toast } from 'sonner';

export default function Details({
  visible,
  setVisible,
  task,
}: {
  visible: boolean,
  setVisible: (visible: boolean) => void,
  task: Task
}) {
  const [edit, setEdit] = useState(false);
  const [expand, setExpand] = useState(false);
  const [value, setValue] = useState(task.title);
  const [inputValue, setInputValue] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTask = useUpdateTask();
  const handleSave = () => {
    if (inputValue.trim()) {
      updateTask.mutate({
        id: task.id,
        title: inputValue,
        status: TaskStatus.DONE
      });
      setValue(inputValue);
      setEdit(false);
    } else {
      toast.error("Failed to update task. Title cannot be empty.");
    }
  }

  const handleExpandNotes = () => {
    setExpand(!expand);
    setVisible(!visible);
  }

  useEffect(() => {
    if (edit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [edit]);

  const dateObj = new Date(task.created_at);
  const dateReadable = dateObj.toLocaleString();
  return (
    <div className="h-14 w-5/6 flex-1 flex justify-between items-start background-pill rounded-r-full">
      <div className="h-full w-5/6 px-3 whitespace-nowrap">
        {edit
          ? (
            <input
              ref={inputRef}
              type='text'
              className="outline-none text-base text-gray-100/40 bg-stone-800/40 w-full pt-2 mt-1"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSave();
                }

                if (event.key === 'Escape') {
                  setEdit(false);
                  setInputValue(task.title);
                }
              }}
            />
          )
          : (
            <>
              <h2 className="text-base text-gray-100/80 pt-2 truncate">
                {value}
              </h2>
            </>
          )}
        <div className="flex space-x-4">
          <h3 className="text-xs text-gray-100/40">
            Created at: {dateReadable}
          </h3>
          <div
            onClick={handleExpandNotes}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <h3 className="text-xs text-gray-100/40">
              {expand ? 'Close' : 'View'} notes
            </h3>
            {expand
              ? <ChevronUp className="text-gray-100/40 h-4 w-4" />
              : <ChevronDown className="text-gray-100/40 h-4 w-4" />
            }
          </div>
        </div>
      </div>
      <div className="h-full w-20 flex items-center space-x-4">
        {edit ? (
          <Check
            onClick={handleSave}
            className="text-gray-100/40 cursor-pointer" size={18}
          />
        ) : (

          <Pencil
            onClick={() => setEdit(true)}
            className="text-gray-100/40 cursor-pointer" size={18}
          />
        )}
        <Trash2 className="text-gray-100/40 cursor-pointer" size={18} />
      </div>
    </div>
  )
}
