import { CircleCheckBig } from 'lucide-react';
import { TaskStatus, TaskStyle } from '../../lib/types.ts';

export default function Status({ status }: { status: TaskStatus }) {
  const style: Record<TaskStatus, TaskStyle> = {
    'To do': {
      background: 'background-pill',
      border: 'border-r-indigo-500/15'
    },
    'Ongoing': {
      background: 'bg-yellow-200/20',
      border: 'border-r-yellow-400/50'
    },
    'Done': {
      background: 'bg-green-500/20',
      border: 'border-r-green-800/80'
    }
  };
  const currentStyle = style[status];
  return (
    <>
      <div className={`w-16 flex-none flex justify-center items-center ${currentStyle.background} rounded-l-full relative border-r-5 ${currentStyle.border}`}>
        <CircleCheckBig size={20} className="text-white/70" />
      </div>
    </>
  )
}
