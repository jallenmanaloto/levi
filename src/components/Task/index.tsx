import { useState } from "react";
import { Task as TTask } from "../../lib/types";
import Notes from '../Notes';

import Details from "./Details";
import Status from "./Status";

export default function Task({ task }: { task: TTask }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="flex">
        <Status status={task.status} />
        <Details visible={visible} setVisible={setVisible} task={task} />
      </div>
      {visible ? <Notes /> : null}
    </>
  )
}
