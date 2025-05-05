import { useFetchNotes } from '../../data/note.ts';
import { Task } from '../../lib/types.ts';
import AddNote from './AddNote.tsx';
import Note from './Note.tsx';

export default function Notes({ task }: { task: Task }) {
  const { data: notes } = useFetchNotes(task.id);
  return (
    <div className="flex flex-col items-center py-1 space-y-2">
      {notes ? notes.map(note => {
        return (
          <Note key={note.id} note={note.note} />
        )
      }) : null}
      <AddNote taskId={task.id} />
    </div>
  )
}
