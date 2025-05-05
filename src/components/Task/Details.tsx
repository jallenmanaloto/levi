import { Check, ChevronDown, ChevronUp, Pencil, Trash2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Task } from '../../lib/types';
import { useDeleteTask, useUpdateTask } from '../../data/task';
import { toast } from 'sonner';
import StatusDropdown from './StatusDropdown';

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
  const [status, setStatus] = useState(task.status);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTask = useUpdateTask();
  const handleSave = () => {
    if (inputValue === value) {
      setEdit(false);
      return;
    }

    if (inputValue.trim()) {
      updateTask.mutate({
        id: task.id,
        title: inputValue,
        status
      });
      setValue(inputValue);
      setEdit(false);
    } else {
      toast.error("Failed to update task. Title cannot be empty.");
    }
  }

  const deleteTask = useDeleteTask();
  const handleDelete = () => {
    deleteTask.mutate({ id: task.id });
  }

  const handleExpandNotes = () => {
    setExpand(!expand);
    setVisible(!visible);
  }

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSave();
    }

    if (event.key === 'Escape') {
      setEdit(false);
      setInputValue(task.title);
    }
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
              onKeyDown={(event) => handleOnKeyDown(event)}
            />
          )
          : (
            <>
              <h2 className="text-base text-gray-100/80 pt-2 truncate">
                {task.title}
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
          <div className="flex items-center space-x-2">
            <h3 className="text-xs text-gray-100/40">
              Status:
            </h3>
            <StatusDropdown task={task} setStatus={setStatus} />
          </div>
        </div>
      </div>
      <div className="h-full w-20 flex items-center space-x-4">
        {edit ? (
          <Check
            onClick={handleSave}
            className="text-green-300/50 cursor-pointer" size={18}
          />
        ) : (

          <Pencil
            onClick={() => setEdit(true)}
            className="text-gray-100/40 cursor-pointer" size={18}
          />
        )}
        {edit
          ? (
            <X
              onClick={() => setEdit(false)}
              className="text-gray-100/40 cursor-pointer" size={18}
            />
          )
          : (
            <Trash2
              onClick={handleDelete}
              className="text-gray-100/40 cursor-pointer" size={18}
            />
          )}
      </div>
    </div>
  )
}
