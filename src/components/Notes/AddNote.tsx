import { useEffect, useRef, useState } from 'react';
import { CircleChevronRight, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

export default function AddNote() {
  const [addNote, setAddNote] = useState(false);
  const [note, setNote] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddNoteSubmit = async () => {
    // if (taskTitle.trim()) {
    //   addTaskMutation.mutate({ title: taskTitle, status: taskStatus });
    //   setNote('');
    //   setAddNote(false);
    // } else {
    //   toast.error('Failed to add note. Description cannot be empty.');
    // }
  };

  useEffect(() => {
    if (addNote && inputRef.current) {
      inputRef.current.focus();
    }
  }, [addNote]);

  return (
    <div className="w-full flex justify-center">
      {addNote
        ? (
          <div className="flex items-center w-5/6 h-8 background-pill rounded-full transition-all duration-550 ease-in-out">
            <div className="flex justify-center items-center rounded-full h-5 w-5 bg-stone-800/40 mx-2 cursor-pointer">
              <X
                onClick={() => setAddNote(false)}
                className="text-green-200 h-4 w-4"
              />
            </div>
            <input
              ref={inputRef}
              type='text'
              placeholder='Note'
              className="text-sm w-5/6 text-gray-100/30 flex-1 outline-none"
            />
            <CircleChevronRight
              className="text-green-200 h-5 w-6 mr-3 cursor-pointer"
            />
          </div>
        )
        : (
          <div
            onClick={() => {
              setAddNote(true)
              setNote('');
            }}
            className="w-full flex justify-center"
          >
            <div
              className={`
              flex items-center space-x-2 h-8 px-2 text-center
              cursor-pointer w-28 background-pill rounded-full
              transition-opacity duration-700 ease-in-out ${addNote ? 'opacity-100' : 'opacity-0'}
              opacity-100 scale-100`}
            >
              <div
                className="flex justify-center items-center w-5 h-5 bg-green-300/50 rounded-full"
              >
                <Plus className="text-gray-100 h-4 w-4" />
              </div>
              <h2 className="text-xs text-green-300/50">
                Add note
              </h2>
            </div>
          </div>
        )
      }
    </div>
  )
}
