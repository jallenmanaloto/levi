import { TaskStatus } from "../../lib/types";

import Details from "./Details";
import Status from "./Status";

export default function Task({ status }: { status: TaskStatus }) {
  return (
    <div className="flex">
      <Status status={status} />
      <Details />
    </div>
  )
}
