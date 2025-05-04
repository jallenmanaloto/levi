import { useState } from 'react';
import { CircleChevronRight, Plus, X } from 'lucide-react';

import { toast } from 'sonner';
import { invoke } from "@tauri-apps/api/core";

import Header from "../components/Header";
import TaskList from "./TaskList";

export default function Main() {
  const [addTask, setAddTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskStatus, setTaskStatus] = useState('todo');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value);
  };

  const handleAddTaskSubmit = async () => {
    if (taskTitle.trim()) {
      try {
        await invoke('add_task_command', { title: taskTitle, status: taskStatus });
        setAddTask(false);
        setTaskTitle('');
        setTaskStatus('todo');

        toast.success('Successfully add task.');
      } catch (error) {
        toast.error('Failed to add a task.');
      }
    } else {
      // Optionally show a message to the user that the task title cannot be empty
      toast.error('Failed to add task. Title cannot be empty.');
    }
  };

  return (
    <div className="container flex flex-col h-screen p-2 background-main-dark">
      <Header />
      <div className="flex-1 py-4 px-3 pt-12 space-y-4 overflow-y-auto">
        {/* List of tasks */}
        <TaskList />
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
            <input
              type='text'
              placeholder='Task name'
              className="text-sm w-5/6 text-gray-100/30 flex-1 outline-none"
              value={taskTitle}
              onChange={handleTitleChange}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleAddTaskSubmit();
                }
              }}
            />
            <CircleChevronRight
              onClick={handleAddTaskSubmit}
              className="text-green-200 h-6 w-6 mr-3 cursor-pointer"
            />
          </div>
        ) : (
          <div
            onClick={() => {
              setAddTask(true)
              setTaskTitle('');
            }}
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
