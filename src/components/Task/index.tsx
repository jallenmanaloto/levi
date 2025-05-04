import { useState } from "react";
import { Task as TTask, TaskStatus } from "../../lib/types";
import Notes from '../Notes';

import Details from "./Details";
import Status from "./Status";

export default function Task({ status }: { status: TaskStatus }) {
  const [visible, setVisible] = useState(false);

  // Dummy task data
  const task: TTask = {
    name: "A task here",
    createdAt: "Jan-01-2025"
  }
  return (
    <>
      <div className="flex">
        <Status status={status} />
        <Details visible={visible} setVisible={setVisible} task={task} />
      </div>
      {visible ? <Notes /> : null}
    </>
  )
}
