import { useState } from "react";
import { TaskStatus } from "../../lib/types";
import Notes from '../Notes';

import Details from "./Details";
import Status from "./Status";

export default function Task({ status }: { status: TaskStatus }) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div className="flex">
        <Status status={status} />
        <Details visible={visible} setVisible={setVisible} />
      </div>
      {visible ? <Notes /> : null}
    </>
  )
}
