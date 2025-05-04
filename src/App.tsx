// import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import TaskList from "./components/TaskList";

function App() {
  return (
    <main className="w-screen h-screen background-main-dark">
      <TaskList />
    </main>
  );
}

export default App;
