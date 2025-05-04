import { CircleChevronRight, Plus, X } from 'lucide-react';
import { TaskStatus } from "../lib/types";
import Header from "../components/Header";
import Task from "./Task";
import { useState } from 'react';

export default function TaskList() {
  const [addTask, setAddTask] = useState(false);
  return (
    <div className="container flex flex-col h-screen p-2 background-main-dark">
      <Header />
      <div className="flex-1 py-4 px-3 pt-12 space-y-4 overflow-y-auto">
        <Task status={TaskStatus.TODO} />
        <Task status={TaskStatus.ONGOING} />
        <Task status={TaskStatus.DONE} />
        <Task status={TaskStatus.TODO} />
        <Task status={TaskStatus.ONGOING} />
        <Task status={TaskStatus.DONE} />
        <Task status={TaskStatus.TODO} />
        <Task status={TaskStatus.ONGOING} />
        <Task status={TaskStatus.DONE} />
        <Task status={TaskStatus.TODO} />
        <Task status={TaskStatus.ONGOING} />
        <Task status={TaskStatus.DONE} />
        <Task status={TaskStatus.TODO} />
        <Task status={TaskStatus.ONGOING} />
        <Task status={TaskStatus.DONE} />
        <Task status={TaskStatus.TODO} />
        <Task status={TaskStatus.ONGOING} />
        <Task status={TaskStatus.DONE} />
      </div>

      <div className="w-full py-6">
        {addTask ? (
          <div className="flex items-center w-full h-12 background-pill rounded-full transition-all duration-500 ease-in-out transform opacity-100 scale-100">
            <div className="flex justify-center items-center rounded-full h-8 w-8 bg-stone-800/40 mx-2 cursor-pointer">
              <X
                onClick={() => setAddTask(false)}
                className="text-green-200 h-4 w-4"
              />
            </div>
            <input type='text' placeholder='Task name' className="text-sm w-5/6 text-gray-100/30 flex-1 outline-none" />
            <CircleChevronRight className="text-green-200 h-6 w-6 mr-3 cursor-pointer" />
          </div>
        ) : (
          <div
            onClick={() => setAddTask(true)}
            className="flex items-center space-x-2 h-12 px-2 text-center cursor-pointer w-32 background-pill rounded-full transition-all duration-300 ease-in-out opacity-100 scale-100"
          >
            <div className="flex justify-center items-center w-8 h-8 bg-green-300/50 rounded-full">
              <Plus className="text-gray-100 h-6 w-6" />
            </div>
            <h2 className="text-sm text-green-300/50">
              Add task
            </h2>
          </div>
        )}
      </div>
    </div>
  )
}
