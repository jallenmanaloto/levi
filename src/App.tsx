import "./App.css";
import Main from "./components/Main";
import { Toaster } from "sonner";

function App() {
  return (
    <main className="w-screen h-screen background-main-dark">
      <Toaster richColors position="bottom-center" closeButton />
      <Main />
    </main>
  );
}

export default App;
