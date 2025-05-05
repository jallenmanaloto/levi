import { Task as TTask } from "../../lib/types";
import Notes from '../Notes';

import Details from "./Details";
import Status from "./Status";
import { useNoteVisibilityStore } from "../../lib/store";

export default function Task({ task }: { task: TTask }) {
  // Get visibility state and actions from store
  const {
    setNoteVisibility,
    isNoteVisible
  } = useNoteVisibilityStore();

  // Check if this task's notes are visible
  const visible = isNoteVisible(task.id);

  // Handle visibility changes
  const setVisible = (isVisible: boolean) => {
    setNoteVisibility(task.id, isVisible);
  };

  return (
    <>
      <div className="flex">
        <Status status={task.status} />
        <Details visible={visible} setVisible={setVisible} task={task} />
      </div>
      {visible ? <Notes task={task} /> : null}
    </>
  )
}
