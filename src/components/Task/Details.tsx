import { ChevronDown, ChevronUp, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Details() {
  const [expand, setExpand] = useState(false);
  return (
    <div className="h-14 w-5/6 flex-1 flex justify-between items-start background-pill rounded-r-full">
      <div className="h-full w-5/6 px-3 whitespace-nowrap">
        <h2 className="text-base text-gray-100/80 pt-2 truncate">
          Task here
        </h2>
        <div className="flex space-x-4">
          <h3 className="text-xs text-gray-100/40">
            Created at: Jan-12-2025
          </h3>
          <div
            onClick={() => setExpand(!expand)}
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
        <Pencil className="text-gray-100/40 cursor-pointer" size={18} />
        <Trash2 className="text-gray-100/40 cursor-pointer" size={18} />
      </div>
    </div>
  )
}
