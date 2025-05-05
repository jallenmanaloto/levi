import AddNote from './AddNote.tsx';
import Note from './Note.tsx';

export default function Notes() {
  return (
    <div className="flex flex-col items-center py-1 space-y-2">
      <Note note='Some note' />
      <Note note='another note' />
      <AddNote />
    </div>
  )
}
