import { Mic, MicOff } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { UnlistenFn, listen } from '@tauri-apps/api/event';
import { toast } from 'sonner';

export default function Voice() {
  const [active, setActive] = useState(false);
  const isFirstRender = useRef(true);
  const unlisten = useRef<UnlistenFn | null>(null);

  // Clean up event listener on unmount
  useEffect(() => {
    return () => {
      if (unlisten.current) {
        unlisten.current();
      }
    }
  }, [])

  useEffect(() => {
    // Skip running this effect on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (active) {
      const createWindow = async () => {
        try {
          await invoke('create_voice_window');

          unlisten.current = await listen('voice-window-closed', () => {
            setActive(false);
          });
        } catch (err) {
          toast.error("Failed to initialize voice activiation feature.");
        }
      };
      createWindow();
    }
  }, [active]);

  return (
    <div className='pr-5'>
      {active
        ? <Mic
          className="text-green-200 cursor-pointer"
          size={16}
          onClick={() => setActive(false)}
        />
        : <MicOff
          className="text-orange-200 cursor-pointer"
          size={16}
          onClick={() => setActive(true)}
        />
      }
    </div>
  )
}
