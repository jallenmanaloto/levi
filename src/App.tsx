import { useEffect } from 'react';
import { Toaster } from "sonner";
import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';

import Main from "./components/Main";
import "./App.css";

function App() {
  useEffect(() => {
    const checkForUpdate = async () => {
      const update = await check();
      if (update) {
        let downloaded = 0;
        let contentLength = 0;

        await update.downloadAndInstall((event) => {
          switch (event.event) {
            case 'Started':
              if (contentLength) {
                contentLength = event.data.contentLength as number;
              }
              break;
            case 'Progress':
              downloaded += event.data.chunkLength;
              break;
            case 'Finished':
              break;
          }
        });

        await relaunch();
      }
    }

    checkForUpdate();
  }, [])
  return (
    <main className="w-screen h-screen background-main-dark">
      <Toaster richColors position="bottom-center" closeButton />
      <Main />
    </main>
  );
}

export default App;
