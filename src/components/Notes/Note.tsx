import { Check, Pencil, SquareDot, Trash2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
export default function Note({ note }: { note: string }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(note);
  const [inputValue, setInputValue] = useState(note);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditToggle = () => {
    setInputValue(value);
    setEdit(true);
  }

  const handleSave = () => {
    setValue(inputValue);
    setEdit(false);
  }

  useEffect(() => {
    if (edit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [edit])

  return (
    <div className="flex justify-between items-start w-5/6 background-pill select-none">
      <div className="flex items-center w-5/6">
        <SquareDot className="h-4 w-4 text-gray-100/40 m-2" />
        {edit
          ? (
            <input
              ref={inputRef}
              type='text'
              className="outline-none text-xs text-gray-100/40 bg-stone-800/40 w-full"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          )
          : (
            <h2 className="text-xs text-gray-100/40">
              {value}
            </h2>
          )
        }

      </div>
      <div className="h-8 w-24 flex justify-end items-center space-x-4 pr-4">
        {edit
          ? (
            <>
              <Check
                onClick={handleSave}
                className="text-green-300/50 cursor-pointer h-4 w-4 cursor-pointer"
              />
              <X
                onClick={() => setEdit(false)}
                className="text-gray-100/40 cursor-pointer h-4 w-4 cursor-pointer"
              />
            </>
          ) : (
            <>
              <Pencil onClick={handleEditToggle} className="text-gray-100/40 cursor-pointer h-4 w-4 cursor-pointer" />
              <Trash2 className="text-gray-100/40 cursor-pointer h-4 w-4 cursor-pointer" />
            </>
          )}
      </div>
    </div>
  )
}
